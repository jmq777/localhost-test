"use strict";

const imagesBuilder = require("./images-builder");
const logger = require("../logger");

/**
 * buildListActionsOnGoogle builds lists for Actions on Google
 * @param {Object} listData 
 * @example
 * {
 *      "title": "List title (optional)",
 *      "items": 
 *      [
 *          {
 *              "title": "Item One (required)",
 *              "infoKey": "itemOne (required)",
 *              "description": "Item One Description (optional)",
 *              "synonyms": ["thing one", "object one"],
 *              "imageUri": "http://imageOneUrl.com (optional)",
 *              "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
 *          },
 *          {
 *              "title": "Item Two (required)",
 *              "infoKey": "itemTwo (required)",
 *              "description": "Item Two Description (optional)",
 *              "synonyms": ["thing two", "object two"],
 *              "imageUri": "http://imageTwoUrl.com (optional)",
 *              "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)"
 *          }
 *      ]
 * }
 */
const buildListActionsOnGoogle = (listData) => {
    let items = [];
    if(listData.items.length < 2) {
        logger.log("error", "List Card can have minimum 2 and maximum 30 items");
        throw new Error("List Card can have minimum 2 and maximum 30 items");
    }
    listData.items.forEach((item) => {
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
        "listSelect": {
            "title": listData.title ? listData.title : "",
            "items": items
        }
    }
}

module.exports = { buildListActionsOnGoogle };
