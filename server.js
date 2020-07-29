"use strict";

const expressApp = require("./app");
const http = require("http");
const config = require("./config")();
const getLogger = require("./logger/getLogger");
const logger = getLogger(__filename.slice(__dirname.length + 1));

expressApp()
    .then(app => {
        const server = http.createServer(app);
        server.listen(config.port, (err) => {
            if (err) {
                logger.error(err, `Server error: ${err.message}`);
            } else {
                logger.info(`Server running at ${config.port}`);
                console.log(process.env.NODE_ENV);
                console.log(process.env.USER_NAME);
                console.log(process.env.PASSWORD);
            }
        });
    });
