"use strict";

const logger = require("../logger");

/**
 * buildSuggestionActionsOnGoogle builds response for suggestions for Actions on Google
 * @param {Object} suggestions 
 * @example
 *  {
 *      "suggestions": ["Suggestion 1", "Suggestion 2"]
 *  }
 */
const buildSuggestionActionsOnGoogle = (suggestions) => {
    let responseSuggestions = [];
    if(suggestions.suggestions.length < 1) {
        logger.log("error", "Please enter atleast one suggestion");
        throw new Error("Please enter atleast one suggestion");
    }
    suggestions.suggestions.forEach((suggestion) => {
        responseSuggestions.push({ "title": suggestion });
    });
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "suggestions": {
            "suggestions": responseSuggestions
        }
    }
}

/**
 * buildSuggestionFacebookMessenger builds response for quickReplies for Facebook Messenger
 * @param {Object} suggestions 
 * @example
 *  {
 *      "title": "Suggestions Title (optional)",
 *      "suggestions": ["Suggestion 1", "Suggestion 2"]
 *  }
 */
const buildSuggestionFacebookMessenger = (suggestions) => {
    let responseQuickReplies = [];
    if(suggestions.suggestions.length < 1) {
        logger.log("error", "Please enter atleast one suggestion");
        throw new Error("Please enter atleast one suggestion");
    }
    suggestions.suggestions.forEach(suggestion => {
        responseQuickReplies.push(suggestion);
    });
    return {
        "platform": "FACEBOOK",
        "quickReplies": {
            "title": suggestions.title ? suggestions.title : "",
            "quickReplies": responseQuickReplies
        }
    }
}

module.exports = { buildSuggestionActionsOnGoogle, buildSuggestionFacebookMessenger };
