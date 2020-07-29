"use strict";
let enviroment = process.env.NODE_ENV || "development";

/**
 * This error handler is used when the error is thrown
 * @param {Object} err Error
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next to handle error
 * @returns {Sring} error message
 */
const errorHandler = (err, req, res, next) => {
    let errObj = {};
    let status = err.status || 500;

    if (res.headersSent) {
        return next(err);
    }

    errObj["stackTrace"] = (enviroment === "development") ? err.stack : "";
    errObj["status"] = status;
    errObj["details"] = err.details || "Error details not found";
    errObj["message"] = err.message || "Internal server error.";
    res.status(status).json(errObj);
};

module.exports = errorHandler;
