"use strict";

const imagesBuilder = require("./images-builder");
const logger = require("../logger");

/**
 * buildTableCardActionsOnGoogle builds response for table cards for Actions on Google
 * @param {Object} tableCardData 
 * @example
 *  {
 *      "title": "Table Card title (required)",
 *      "subtitle": "Table Card subtitle (optional)",
 *      "imageUri": "http://imageUrl.com (required)",
 *      "imageAccessibilityText": "Image description for screen readers (required)",
 *      "columnProperties": 
 *      [
 *          {
 *              "header": "Header 1, (required)",
 *              "horizontalAlignment": "CENTER or LEADING or TRAILING (optional, default: LEADING)"
 *          },
 *          {
 *              "header": "Header 2, (required)",
 *              "horizontalAlignment": "CENTER or LEADING or TRAILING (optional, default: LEADING)"
 *          }
 *      ],
 *      "rows": 
 *      [
 *          {
 *              "cells": 
 *              [
 *                  {
 *                      "text": "Cell A1 (optional)"
 *                  },
 *                  {
 *                      "text": "Cell A2 (optional)"
 *                  }
 *              ],
 *              "dividedAfter": "true or false (optional, default: false)"
 *          },
 *          {
 *              "cells": 
 *              [
 *                  {
 *                      "text": "Cell B1 (optional)"
 *                  },
 *                  {
 *                      "text": "Cell B2 (optional)"
 *                  }
 *              ],
 *              "dividedAfter": "true or false (optional, default: false)"
 *          }
 *      ],
 *      "buttons": [{
 *          "title": "Button title (optional)", 
 *          "uri": "https://linkUrl.com (required if title is given)"
 *      }]
 *  }
 */
const buildTableCardActionsOnGoogle = (tableCardData) => {
    let columnProperties = [];
    let rows = [];
    let buttons = [];
    if(!tableCardData.title) {
        logger.log("error", "Parameter 'title' is required");
        throw new Error("Parameter 'title' is required");
    }
    if(tableCardData.columnProperties.length < 1) {
        logger.log("error", "Minimum 1 column is required");
        throw new Error("Minimum 1 column is required");
    }
    if(tableCardData.rows.length < 1) {
        logger.log("error", "Minimum 1 row is required");
        throw new Error("Minimum 1 row is required");
    }
    tableCardData.columnProperties.forEach((columnProperty) => {
        if(!columnProperty.header) {
            logger.log("error", "Parameter 'header' for a particular column is required");
            throw new Error("Parameter 'header' for a particular column is required");
        }
        columnProperties.push({
            "header": columnProperty.header,
            "horizontalAlignment": columnProperty.horizontalAlignment ? columnProperty.horizontalAlignment : "LEADING"
        });
    });
    tableCardData.rows.forEach((row) => {
        let rowCells = [];
        if(row.cells.length != tableCardData.columnProperties.length) {
            logger.log("error", "Number of cells in a row should be equal to the number of columns");
            throw new Error("Number of cells in a row should be equal to the number of columns");
        }
        row.cells.forEach((cell) => {
            rowCells.push({ "text": cell.text ? cell.text : "" });
        });
        rows.push({
            "cells": rowCells,
            "dividedAfter": row.dividedAfter ? row.dividedAfter : false
        });
    });
    if(tableCardData.buttons && tableCardData.buttons.length > 0) {
        tableCardData.buttons.forEach((button) => {
            if(!button.title) {
                logger.log("error", "Please enter button 'title'");
                throw new Error("Please enter button 'title'");
            }
            if(!button.uri) {
                logger.log("error", `Parameter 'uri' for button '${button.title}' is required`);
                throw new Error(`Parameter 'uri' for button '${button.title}' is required`);
            }
            buttons.push({
                "title": button.title,
                "openUriAction": {
                    "uri": button.uri
                }
            });
        });
    }
    return {
        "platform": "ACTIONS_ON_GOOGLE",
        "tableCard": {
            "title": tableCardData.title,
            "subtitle": tableCardData.subtitle ? tableCardData.subtitle : "",
            "image": imagesBuilder.buildImageActionsOnGoogle(tableCardData),
            "columnProperties": columnProperties,
            "rows": rows,
            "buttons": buttons
        }
    }
}

module.exports = { buildTableCardActionsOnGoogle };
