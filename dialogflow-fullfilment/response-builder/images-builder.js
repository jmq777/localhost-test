"use strict";

const logger = require("../logger");

/**
 * buildImageActionsOnGoogle builds response for images for Actions on Google
 * @param {Object} imageData 
 * @example
 *  {
 *      "imageUri": "http://imageUrl.com (required)",
 *      "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
 *  }
 */
const buildImageActionsOnGoogle = (imageData) => {
    if(imageData.imageUri && !imageData.imageAccessibilityText) {
        logger.log("error", "Parameter 'imageAccessibilityText' is required");
        throw new Error("Parameter 'imageAccessibilityText' is required");
    } else if(!imageData.imageUri) {
        return {};
    }
    return {
        "imageUri": imageData.imageUri,
        "accessibilityText": imageData.imageAccessibilityText
    }
}

/**
 * buildImageFacebookMessenger builds response for images for Facebook Messenger
 * @param {Object} imageData 
 * @example
 *  {
 *      "imageUri": "http://imageUrl.com (required)"
 *  }
 */
const buildImageFacebookMessenger = (imageData) => {
    if(!imageData.imageUri) {
        return {};
    }
    return {
        "platform": "FACEBOOK",
        "image": {
            "imageUri": imageData.imageUri
        }
    }
}

module.exports = { buildImageFacebookMessenger, buildImageActionsOnGoogle };
