"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const winston = require("winston");
const expressWinston = require("express-winston");
const webhookController = require("./webhook/webhook-controller");
const databaseConnections = require("./database");
const errorHandler = require("./helper/errorHandler");
const config = require("./config")();
const authMiddleware = require("./helper/basicAuth");
const helmet = require("helmet");
const path = require("path");
const getLogger = require("./logger/getLogger");
const logger = getLogger(__filename.slice(__dirname.length + 1));



module.exports = async () => {
    if (process.env.NODE_ENV == null || process.env.NODE_ENV == "default") {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, "keys/service-account.json");
    }
    let app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(helmet());

    let router = express.Router();

    router.get("/healthcheck", (req, res) => {
    
        res.status(200).json({ "message": "ok" });
    });
    let connections = await databaseConnections();
    let db = undefined;
    if (connections["types"].length == 0) {
        logger.info("database : false");
    }
    else {
        db = connections["connection"];
        logger.info("database : true");
        logger.info(`databaseType(s) : ${connections["types"]}`);

    }

    router.post("/v2beta1/webhook", webhookController(db));

    expressWinston.requestWhitelist.push("body");
    expressWinston.responseWhitelist.push("body");

    expressWinston.bodyBlacklist = config.logger.piiFields;

    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console()
        ],
        metaField: "apiDetails",
        format: winston.format.combine(
            winston.format.json()
        )
    }));

    if (config.auth.enable) {
        app.use(authMiddleware);
    }

    app.use("/", router);

    app.use(errorHandler);

    return app;
};
