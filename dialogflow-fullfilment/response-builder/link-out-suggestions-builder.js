"use strict";

const logger = require("../logger");

/**
 * buildLinkOutSuggestionActionsOnGoogle builds response for link out suggestions for Actions on Google
 * @param {Object} linkOutSuggestionData 
 * @example
 *  {
 *      "destinationName": "Destination Name (required)",
 *      "uri": "http://Url.com (required)"
 *  }
 */
const buildLinkOutSuggestionActionsOnGoogle = (linkOutSuggestionData) => {
    if(!linkOutSuggestionData.destinationName) {
        logger.log("error", "Parameter 'destinationName' is required");
        throw new Error("Parameter 'destinationName' is required");
    }
    if(!linkOutSuggestionData.uri) {
        logger.log("error", "Link Out Suggestion Chip url cannot be empty and protocol must be http or https");
        throw new Error("Link Out Suggestion Chip url cannot be empty and protocol must be http or https");
    }
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "linkOutSuggestion": {
            "destinationName": linkOutSuggestionData.destinationName,
            "uri": linkOutSuggestionData.uri
        }
    }
}

module.exports = { buildLinkOutSuggestionActionsOnGoogle };
