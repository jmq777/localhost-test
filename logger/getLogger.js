"use strict";
const log = require("./index");

const getLogger = (fileName) => {
    const logger = new log.Log();
    logger.setOption("file", fileName);
    return logger;
};

module.exports = getLogger;