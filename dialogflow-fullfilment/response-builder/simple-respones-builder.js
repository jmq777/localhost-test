"use strict";

const logger = require("../logger");

/**
 * buildSimpleResponseActionsOnGoogle builds response for simple response for Actions on Google
 * @param {String} textToSpeech 
 * @param {String} displayText 
 */
const buildSimpleResponseActionsOnGoogle = (textToSpeech, displayText) => {
    if(!textToSpeech) {
        logger.log("error", "Parameter 'textToSpeech' is required");
        throw new Error("Parameter 'textToSpeech' is required");
    }
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "simpleResponses": {
            "simpleResponses": [
                {
                    "textToSpeech": textToSpeech,
                    "displayText": displayText ? displayText : textToSpeech
                }
            ]
        }
    }
}

module.exports = { buildSimpleResponseActionsOnGoogle };
