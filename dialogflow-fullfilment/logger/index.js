"use strict"

const winston = require("winston")

let options = {
	console: {
		level: "debug",
		handleExceptions: true,
		json: false,
		colorize: true,
		timestamp: true
	}
}

let logger = winston.createLogger({
	transports: [
		new winston.transports.Console(options.console)
	],
	exitOnError: false // do not exit on handled exceptions
})

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
	write: function (message) {
		logger.info(message)
	}
}

/**
 * logging levels => error, warn, info, verbose, debug, silly
 * example - 
 * logger.log("error", "this is my error message")
 */

module.exports = logger