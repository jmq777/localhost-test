"use strict";

const imagesBuilder = require("./images-builder");
const logger = require("../logger");

/**
 * buildCarouselCardActionsOnGoogle builds carousel cards for Actions on Google
 * @param {Array} carouselCardItems 
 * @example
 *  [
 *      {
 *          "infoKey": "itemOne (required)",
 *          "title": "Option One Title (required)",
 *          "description": "Option One Description (optional)",
 *          "synonyms": [
 *              "thing one",
 *              "object one"
 *          ],
 *          "imageUri": "http://imageOneUrl.com (optional)",
 *          "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
 *      },
 *      {
 *          "infoKey": "itemTwo (required)",
 *          "title": "Option Two Title (required)",
 *          "description": "Option Two Description (optional)",
 *          "synonyms": [
 *              "thing two",
 *              "object two"
 *          ],
 *          "imageUri": "http://imageTwoUrl.com (optional)",
 *          "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
 *      }
 *  ]
 */
const buildCarouselCardActionsOnGoogle = (carouselCardItems) => {
    let items = [];
    if(carouselCardItems.length < 2) {
        logger.log("error", "Carousel Card can have minimum 2 and maximum 10 items");
        throw new Error("Carousel Card can have minimum 2 and maximum 10 items");
    }
    carouselCardItems.forEach((item) => {
        let synonyms = [];
        if(!item.title) {
            logger.log("error", "Parameter 'title' is required");
            throw new Error("Parameter 'title' is required");
        }
        if(!item.infoKey) {
            logger.log("error", `Parameter 'infoKey' for item '${item.title}' is required and should be unique`);
            throw new Error(`Parameter 'infoKey' for item '${item.title}' is required and should be unique`);
        }
        if(item.synonyms && item.synonyms.length > 0) {
            item.synonyms.forEach((synonym) => {
                if(synonym.length) {
                    synonyms.push(synonym);
                }
            });
        }
        items.push({
            "info": {
                "key": item.infoKey,
                "synonyms": synonyms
            },
            "title": item.title,
            "description": item.description ? item.description : "",
            "image": imagesBuilder.buildImageActionsOnGoogle(item)
        });
    });
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "carouselSelect": {
            "items": items
        }
    }
}

module.exports = { buildCarouselCardActionsOnGoogle };
