"use strict";

const responseBuilder = require("./response-builder");
const appConstants = require("./response-builder/constants");
const logger = require("./logger");
const contextHelper = require("./helpers/context");

class DialogflowFulfillment {
    /**
     * 
     * @param {Object} config
     * @example 
     * {
     *     "platformsEnabled": [ "ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY" ]
     * } 
     * @param {Object} request
     */
    constructor(config, request) {
        if (config.platformsEnabled && config.platformsEnabled.length > 0) {
            config.platformsEnabled.forEach(platform => {
                if (appConstants.platformSupport.indexOf(platform) < 0) {
                    throw new Error(`platform - ${platform} not supported`);
                }
            });
            this._config = config;
            this._request = request;
            this._response = {
                fulfillmentText: "",
                fulfillmentMessages: [],
                outputContexts: []
            };
        } else {
            throw new Error("Malformed parameters");
        }
    }

    /**
     * setResponseText sets text response
     * @param {String} responseText 
     */
    setResponseText(responseText) {
        this._response.fulfillmentText = responseText;
        this._response.fulfillmentMessages.push({ "text": { "text": [responseText] } });
    }

    /**
     * setSimpleResponses sets simpleResponses for all supported platforms
     * @param {String} textToSpeech 
     * @param {String} displayText 
     */
    setSimpleResponses(textToSpeech, displayText) {
        let simpleReponses = responseBuilder.buildSimpleResponses(this._config.platformsEnabled, textToSpeech, displayText);
        simpleReponses.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setSuggestions sets suggestion chips for all supported platforms
     * @param {Object} suggestions 
     * @example
     *  {
     *      "title": "Suggestions Title (optional)",
     *      "suggestions": ["Suggestion 1", "Suggestion 2"]
     *  }
     */
    setSuggestions(suggestions) {
        let suggestionResponse = responseBuilder.buildSuggestions(this._config.platformsEnabled, suggestions);
        suggestionResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setBasicCards sets basic cards for all supported platforms
     * @param {Object} cardData 
     * @example
     *  {
     *      "formattedText": "Card Description (required)",
     *      "title": "Card Title (optional)",
     *      "subtitle": "Card Subtitle (optional)",
     *      "imageUri": "http://imageUrl.com (optional and protocol must be http/https)",
     *      "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)",
     *      "buttons": [{
     *          "title": "Card Link title (optional)",
     *          "uri": "https://linkUrl.com (required only if title given and protocol must be http/https)",
     *          "postback": "Text or URL (optional)"
     *      }]
     *  }
     */
    setBasicCards(cardData) {
        let basicCardsResponse = responseBuilder.buildBasicCards(this._config.platformsEnabled, cardData);
        basicCardsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setCarouselCards sets carousel cards for all supported platforms
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
    setCarouselCards(carouselCardItems) {
        let carouselCardResponse = responseBuilder.buildCarouselCards(this._config.platformsEnabled, carouselCardItems);
        carouselCardResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setBrowseCarouselCards sets browse carousel cards for all supported platforms
     * @param {Array} browseCarouselCardItems 
     * @example
     *  [
     *      {
     *          "title": "Option one title (required)",
     *          "url": "https://optionOneUrl (required)",
     *          "urlTypeHint": "AMP_CONTENT (optional)",
     *          "description": "Option one description (optional)",
     *          "imageUri": "http://imageOneUrl.com (optional)",
     *          "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)",
     *          "footer": "Option one footer (optional)"
     *      },
     *      {
     *          "title": "Option two title (required)",
     *          "url": "https://optionTwoUrl (required)",
     *          "urlTypeHint": "AMP_CONTENT (optional)",
     *          "description": "Option two description (optional)",
     *          "imageUri": "http://imageTwoUrl.com (optional)",
     *          "imageAccessibilityText": "Image description for screen readers (required only if imageUri given)",
     *          "footer": "Option two footer (optional)"
     *      }
     *  ]
     */
    setBrowseCarouselCards(browseCarouselCardItems) {
        let isSimpleResponsePresent = false;
        for (let i = 0; i < this._response.fulfillmentMessages.length; i++) {
            if (Object.keys(this._response.fulfillmentMessages[i]).includes("simpleResponses")) {
                isSimpleResponsePresent = true;
                break;
            }
        }
        if (!isSimpleResponsePresent) {
            logger.log("error", "Google Assistant 'simpleResponse' should be added to intent");
            throw new Error("Google Assistant 'simpleResponse' should be added to intent");
        }
        let browseCarouselCardsResponse = responseBuilder.buildBrowseCarouselCards(this._config.platformsEnabled, browseCarouselCardItems);
        browseCarouselCardsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setLists sets lists for all supported platforms
     * @param {Object} listData 
     * @example
     *  {
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
    setLists(listData) {
        let listsResponse = responseBuilder.buildLists(this._config.platformsEnabled, listData);
        listsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setLinkOutSuggestions sets link out suggestions for all supported platforms
     * @param {Object} linkOutSuggestionData 
     * @example
     *  {
     *      "destinationName": "Destination Name (required)",
     *      "uri": "http://Url.com (required)"
     *  }
     */
    setLinkOutSuggestions(linkOutSuggestionData) {
        let linkOutSuggestionsResponse = responseBuilder.buildLinkOutSuggestions(this._config.platformsEnabled, linkOutSuggestionData);
        linkOutSuggestionsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setMediaContents sets media contents for all supported platforms
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
    setMediaContents(mediaContentData) {
        let i = 0;
        let isSimpleResponsePresent = false;
        let isSuggestionChipsPresent = false;
        for (i = 0; i < this._response.fulfillmentMessages.length; i++) {
            if (!isSimpleResponsePresent) {
                isSimpleResponsePresent = Object.keys(this._response.fulfillmentMessages[i]).includes("simpleResponses") ? true : false;
            }
            if (!isSuggestionChipsPresent) {
                isSuggestionChipsPresent = Object.keys(this._response.fulfillmentMessages[i]).includes("suggestions") ? true : false;
            }
            if (isSimpleResponsePresent && isSuggestionChipsPresent) {
                break;
            }
        }
        if (!isSimpleResponsePresent && !isSuggestionChipsPresent) {
            logger.log("error", "Google Assistant 'simpleResponse' and 'suggestions' should be added to intent");
            throw new Error("Google Assistant 'simpleResponse' and 'suggestions' should be added to intent");
        } else if (!isSimpleResponsePresent && isSuggestionChipsPresent) {
            logger.log("error", "Google Assistant 'simpleResponse' should be added to intent");
            throw new Error("Google Assistant 'simpleResponse' should be added to intent");
        } else if (isSimpleResponsePresent && !isSuggestionChipsPresent) {
            logger.log("error", "Google Assistant 'suggestions' should be added to intent");
            throw new Error("Google Assistant 'suggestions' should be added to intent");
        }
        let mediaContentsResponse = responseBuilder.buildMediaContents(this._config.platformsEnabled, mediaContentData);
        mediaContentsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setTableCards sets table cards for all supported platforms
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
    setTableCards(tableCardData) {
        let isSimpleResponsePresent = false;
        for (let i = 0; i < this._response.fulfillmentMessages.length; i++) {
            if (Object.keys(this._response.fulfillmentMessages[i]).includes("simpleResponses")) {
                isSimpleResponsePresent = true;
                break;
            }
        }
        if (!isSimpleResponsePresent) {
            logger.log("error", "Google Assistant 'simpleResponse' should be added to intent");
            throw new Error("Google Assistant 'simpleResponse' should be added to intent");
        }
        let tableCardsResponse = responseBuilder.buildTableCards(this._config.platformsEnabled, tableCardData);
        tableCardsResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setImages sets image cards for all supported platforms
     * @param {Object} imageData 
     * @example
     *  {
     *      "imageUri": "http://imageUrl.com (required)"
     *  }
     */
    setImages(imageData) {
        let imagesResponse = responseBuilder.buildImages(this._config.platformsEnabled, imageData);
        imagesResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setPlayAudio sets the given audio file as response
     * @param {String} audioUri 
     * @example
     *  "gs://<bucket>/<object> (required)"
     */
    setPlayAudio(audioUri) {
        let playAudioResponse = responseBuilder.buildPlayAudio(this._config.platformsEnabled, audioUri);
        playAudioResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setSynthesizeSpeech converts given text input to audio
     * @param {String} text 
     * @example
     *  "<Text to convert to audio> (required)"
     */
    setSynthesizeSpeech(text) {
        let synthesizeSpeechResponse = responseBuilder.buildSynthesizeSpeech(this._config.platformsEnabled, text);
        synthesizeSpeechResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setTransferCall transfers call to the given number
     * @param {String} phoneNumber 
     * @example
     *  "+1987654321 (required)"
     */
    setTransferCall(phoneNumber) {
        let transferCallResponse = responseBuilder.buildTransferCall(this._config.platformsEnabled, phoneNumber);
        transferCallResponse.forEach(element => {
            this._response.fulfillmentMessages.push(element);
        });
    }

    /**
     * setPayload sets the given custom payload
     * @param {Object} payload 
     * @example
     *  {
     *      "payload": {
     *          "facebook": {
     *              "attachment": {
     *                  "type": "audio",
     *                  "payload": {
     *                     "url": "https://example.com/audio/test.mp3"
     *                  }
     *              }
     *          }
     *      }
     *  }
     */
    setPayload(payload) {
        this._response.fulfillmentMessages.push({ "payload": payload });
    }

    /**
     * setOutputContext sets output contexts of the given intent
     * @param {String} name 
     * @example "Intent Name"
     * @param {Number} lifespan 
     * @example 5
     * @param {Object} parameters 
     * @example 
     *  {
     *      "username": "yash",
     *      "username.original": "yash"
     *  }
     */
    setOutputContext(name, lifespan, parameters = {}) {
        let context = contextHelper.getContext(this._request, name);
        if (context) {
            context.parameters = context.parameters ? context.parameters : {};
            context.lifespanCount = lifespan;
            let paramKeys = Object.keys(parameters);
            if(paramKeys.length > 0) {
                paramKeys.forEach((paramKey) => {
                    context.parameters[paramKey] = parameters[paramKey];
                });
            }
            this._response.outputContexts.push(context);
        } else {
            let template = {
                "name": `${this._request.session}/contexts/${name}`,
                "lifespanCount": lifespan,
                "parameters": parameters
            };
            this._response.outputContexts.push(template);
        }
    }

    /**
     * getContext returns the outputContext object of the intent name given in the input
     * @param {String} name 
     * @example "Default Welcome Intent"
     * @returns {Object}
     * @example 
     *  {
     *      "name": "Intent Name",
     *      "lifespanCount": 2,
     *      "parameters": {
     *          "username": "yash",
     *          "username.original": "yash"
     *      }
     *  }
     */
    getContext(name) {
        return contextHelper.getContext(this._request, name);
    }

    /**
     * clearContext clears context of the intent given as input
     * @param {String} name 
     * @example "Intent Name"
     */
    clearContext(name) {
        let clearedOutPutContext =  contextHelper.clearContext(this._request, name);
        this._response.outputContexts.push(clearedOutPutContext);
    }

    /**
     * setEvent sets the followupEventInput object
     * @param {String} name 
     * @example "Followup Event"
     * @param {String} languageCode 
     * @example "en-US"
     * @param {Object} parameters 
     * @example
     *  {
     *      "username": "yash",
     *      "username.original": "yash"
     *  }
     */
    setEvent(name, languageCode, parameters) {
        this._response["followupEventInput"] = {
            "name": name,
            "languageCode": languageCode || "en-US",
            "parameters": parameters || {}
        };
    }

    /**
     * getCompiledResponse compiles the entire webhook response built and returns it
     * @returns {Object}
     * @example
     *  {
     *      "responseId": "23f68fe0-b47e-47da-bef2-af24e5e2c2e1-b81332aa",
     *      "queryResult": {
     *      "queryText": "qwer",
     *      "action": "event_prospectus.event_prospectus-yes.event_prospectus-yes-custom",
     *      "parameters": {
     *          "username": "qwer"
     *      },
     *      "allRequiredParamsPresent": true,
     *      "fulfillmentText": "Alright, qwer , please tell me your email ID.",
     *      "fulfillmentMessages": [
     *          {
     *          "platform": "ACTIONS_ON_GOOGLE",
     *          "simpleResponses": {
     *              "simpleResponses": [
     *              {
     *                  "textToSpeech": "Thanks qwer, could you please tell me your email id."
     *              }
     *              ]
     *          }
     *          },
     *          {
     *          "platform": "ACTIONS_ON_GOOGLE",
     *          "suggestions": {
     *              "suggestions": [
     *              {
     *                  "title": "Back"
     *              }
     *              ]
     *          }
     *          },
     *          {
     *          "text": {
     *              "text": [
     *              "Alright, qwer , please tell me your email ID."
     *              ]
     *          }
     *          }
     *      ],
     *      "outputContexts": [
     *          {
     *          "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/test",
     *          "lifespanCount": 7,
     *          "parameters": {
     *              "username": "name"
     *          }
     *          },
     *          {
     *          "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup",
     *          "lifespanCount": 2,
     *          "parameters": {
     *              "username": "qwer",
     *              "username.original": "qwer"
     *          }
     *          },
     *          {
     *          "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus-yes-followup",
     *          "lifespanCount": 1,
     *          "parameters": {
     *              "username": "qwer",
     *              "username.original": "qwer"
     *          }
     *          },
     *          {
     *          "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/user_event_data",
     *          "lifespanCount": 97,
     *          "parameters": {
     *              "username": "qwer",
     *              "username.original": "qwer"
     *          }
     *          }
     *      ],
     *      "intent": {
     *          "name": "projects/events-development-txhmsx/agent/intents/117e7b33-e5ab-414d-a355-eeb9feed1731",
     *          "displayName": "event_prospectus_yes_name"
     *      },
     *      "intentDetectionConfidence": 0.3,
     *      "diagnosticInfo": {
     *          "webhook_latency_ms": 297
     *      },
     *      "languageCode": "en"
     *      },
     *      "webhookStatus": {
     *      "message": "Webhook execution successful"
     *      }
     *  }
     */
    getCompiledResponse() {
        let globalContext = contextHelper.getContext(this._request, "global")
        if (globalContext) {
            globalContext.lifespanCount = 50;
        }
        return this._response;
    }

    /**
     * getErrorResponse returns error response message
     * @returns {Object}
     * @example
     *  {
     *      "queryResult": {
     *          "webhookStatus": {
     *              "code": 3,
     *              "message": "Webhook service failed."
     *          }
     *      }
     *  }
     */
    getErrorResponse() {
        return {
            "queryResult": {
                "webhookStatus": {
                    "code": 3,
                    "message": "Webhook service failed."
                }
            }
        };
    }
}

module.exports = DialogflowFulfillment;
