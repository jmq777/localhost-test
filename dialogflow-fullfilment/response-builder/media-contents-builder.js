"use strict";

const imagesBuilder = require("./images-builder");
const logger = require("../logger");

/**
 * buildMediaContentActionsOnGoogle builds response for media contents for Actions on Google
 * @param {Object} mediaContentData 
 * @example
 *  {
 *      "mediaType": "AUDIO (required, automatically set)",
 *      "mediaObjects": 
 *      [{
 *          "name": "Media content card title (required)",
 *          "contentUrl": "https://urlToMediaFile.com (required)",
 *          "description": "Media Content card description (optional)",
 *          "mediaContentType": "'largeImage' or 'icon' (required)",
 *          "imageUri": "http://imageUrl.com (optional)",
 *          "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)",
 *      }]
 *  }
 */
const buildMediaContentActionsOnGoogle = (mediaContentData) => {
    let mediaObjects = [];
    mediaContentData.mediaObjects.forEach((mediaObject) => {
        if(!mediaObject.name) {
            logger.log("error", "Parameter 'name' is required");
            throw new Error("Parameter 'name' is required");
        }
        if(!mediaObject.mediaContentType) {
            logger.log("error", `Parameter 'mediaContentType' for '${mediaObject.name}' is required`);
            throw new Error(`Parameter 'mediaContentType' for '${mediaObject.name}' is required`);
        }
        if(!mediaObject.contentUrl) {
            logger.log("error", `Media Content url for '${mediaObject.name}' cannot be empty and protocol must be http or https`);
            throw new Error(`Media Content url for '${mediaObject.name}' cannot be empty and protocol must be http or https`);
        }
        mediaObjects.push({
            "name": mediaObject.name,
            "description": mediaObject.description ? mediaObject.description : "",
            [mediaObject.mediaContentType]: imagesBuilder.buildImageActionsOnGoogle(mediaObject),
            "contentUrl": mediaObject.contentUrl
        });
    });
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "mediaContent": {
            "mediaType": mediaContentData.mediaType,
            "mediaObjects": mediaObjects
        }
    }
}

module.exports = { buildMediaContentActionsOnGoogle };
