"use strict";

const config = require("../config")();

/**
 * To perform middleware authentication
 * @param {Object} req request object
 * @param {Object} res response
 * @param {Function} next to handle error
 * @returns 
 */
const basicAuth = (req, res, next) => {
    const auth = req.get("authorization");
    if (req.path === "/healthcheck") {
        next();
    }
    else if (!auth) {
        res.status(401).send({ "status": 401, "message": "Unauthorized" });
    } else {
        const credentials = new Buffer.from(auth.split(" ").pop(), "base64").toString("ascii").split(":");
        if (credentials[0] === config.auth.username && credentials[1] === config.auth.password) {
            next();
        } else {
            res.status(401).send({ "status": 401, "message": "Unauthorized" });
        }
    }
};

module.exports = basicAuth;