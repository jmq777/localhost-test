const chai = require('chai')
const should = require('chai').should() // eslint-disable-line
const expect = require('chai').expect

const webhook_fullfillment = require("../");

describe("Root level index file", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("Checking if getting proper compiled response for each function", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        describe("setResponseText() setSimpleResponses() setSuggestions() setBasicCards() setCarouselCards() setLists() setLinkOutSuggestions() setImages() setPlayAudio() setSynthesizeSpeech() setTransferCall() setPayload() functions check", () => {
            beforeEach(done => {
                done();
            });
            afterEach(done => {
                done();
            });
            it("should return proper output for the proper input", (done) => {
                let expectedConfig = {
                    "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
                };
                let expectedRequest = {};
                let expectedResponse = {
                    "fulfillmentText": "Hello, Quantiphi welcomes you",
                    "fulfillmentMessages": [
                        { "text": { "text": ["Hello, Quantiphi welcomes you"] } },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "simpleResponses": {
                                "simpleResponses": [
                                    {
                                        "textToSpeech": "Hello, Quantiphi welcomes you",
                                        "displayText": "Hello, Quantiphi welcomes you"
                                    }
                                ]
                            }
                        },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "suggestions": {
                                "suggestions": [
                                    { "title": "Suggestion 1" },
                                    { "title": "Suggestion 2" }
                                ]
                            }
                        }, {
                            "platform": "FACEBOOK",
                            "quickReplies": {
                                "title": "Suggestions Title",
                                "quickReplies": ["Suggestion 1", "Suggestion 2"]
                            }
                        },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "basicCard": {
                                "title": "Card Title",
                                "subtitle": "Card Subtitle",
                                "formattedText": "Card Description",
                                "image": {
                                    "imageUri": "http://imageUrl.com",
                                    "accessibilityText": "Image description for screen readers"
                                },
                                "buttons": [{
                                    "title": "Card Link title",
                                    "openUriAction": {
                                        "uri": "https://linkUrl.com"
                                    }
                                }]
                            }
                        }, {
                            "platform": "FACEBOOK",
                            "card": {
                                "title": "Card Title",
                                "subtitle": "Card Subtitle",
                                "imageUri": "http://imageUrl.com",
                                "buttons": [{
                                    "text": "Card Link title",
                                    "postback": "Text or URL"
                                }]
                            }
                        },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "carouselSelect": {
                                "items": [{
                                    "info": {
                                        "key": "itemOne",
                                        "synonyms": ["thing one", "object one"]
                                    },
                                    "title": "Option One Title",
                                    "description": "Option One Description",
                                    "image": {
                                        "imageUri": "http://imageOneUrl.com",
                                        "accessibilityText": "Image description for screen readers"
                                    }
                                }, {
                                    "info": {
                                        "key": "itemTwo",
                                        "synonyms": [],
                                    },
                                    "title": "Option Two Title",
                                    "description": "",
                                    "image": {
                                        "imageUri": "http://imageTwoUrl.com",
                                        "accessibilityText": "Image description for screen readers",
                                    }
                                }]
                            }
                        },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "listSelect": {
                                "title": "List title",
                                "items": [{
                                    "info": {
                                        "key": "itemOne",
                                        "synonyms": [
                                            "thing one",
                                            "object one"
                                        ]
                                    },
                                    "title": "Option One Title",
                                    "description": "Option One Description",
                                    "image": {
                                        "imageUri": "http://imageOneUrl.com",
                                        "accessibilityText": "Image description for screen readers"
                                    }
                                }, {
                                    "info": {
                                        "key": "itemTwo",
                                        "synonyms": [],
                                    },
                                    "title": "Option Two Title",
                                    "description": "",
                                    "image": {}
                                }]
                            }
                        },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "linkOutSuggestion": {
                                "destinationName": "Destination Name",
                                "uri": "http://Url.com"
                            }
                        },
                        {
                            "platform": "FACEBOOK",
                            "image": {
                                "imageUri": "http://imageUrl.com"
                            }
                        },
                        {
                            "platform": "TELEPHONY",
                            "telephonyPlayAudio": {
                                "audioUri": "gs://<bucket>/<object>"
                            }
                        },
                        {
                            "platform": "TELEPHONY",
                            "telephonySynthesizeSpeech": {
                                "text": "Hi, Welcome to Quantiphi"
                            }
                        },
                        {
                            "platform": "TELEPHONY",
                            "telephonyTransferCall": {
                                "phoneNumber": "+17738071969"
                            }
                        },
                        {
                            "payload": {
                                "facebook": {
                                    "attachment": {
                                        "type": "audio",
                                        "payload": {
                                            "url": "https://example.com/audio/test.mp3"
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    "outputContexts": []
                };
                let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                webhookFullfillment.setResponseText("Hello, Quantiphi welcomes you");
                webhookFullfillment.setSimpleResponses("Hello, Quantiphi welcomes you", "Hello, Quantiphi welcomes you");
                webhookFullfillment.setSuggestions({
                    "title": "Suggestions Title",
                    "suggestions": ["Suggestion 1", "Suggestion 2"]
                });
                webhookFullfillment.setBasicCards({
                    "formattedText": "Card Description",
                    "title": "Card Title",
                    "subtitle": "Card Subtitle",
                    "imageUri": "http://imageUrl.com",
                    "imageAccessibilityText": "Image description for screen readers",
                    "buttons": [{
                        "title": "Card Link title",
                        "uri": "https://linkUrl.com",
                        "postback": "Text or URL"
                    }]
                });
                webhookFullfillment.setCarouselCards([{
                    "infoKey": "itemOne",
                    "title": "Option One Title",
                    "description": "Option One Description",
                    "synonyms": ["thing one", "object one"],
                    "imageUri": "http://imageOneUrl.com",
                    "imageAccessibilityText": "Image description for screen readers"
                }, {
                    "infoKey": "itemTwo",
                    "title": "Option Two Title",
                    "imageUri": "http://imageTwoUrl.com",
                    "imageAccessibilityText": "Image description for screen readers"
                }]);
                webhookFullfillment.setLists({
                    "title": "List title",
                    "items": [{
                        "infoKey": "itemOne",
                        "title": "Option One Title",
                        "description": "Option One Description",
                        "synonyms": [
                            "thing one",
                            "object one"
                        ],
                        "imageUri": "http://imageOneUrl.com",
                        "imageAccessibilityText": "Image description for screen readers"
                    }, {
                        "infoKey": "itemTwo",
                        "title": "Option Two Title"
                    }]
                });
                webhookFullfillment.setLinkOutSuggestions({
                    "destinationName": "Destination Name",
                    "uri": "http://Url.com"
                });
                webhookFullfillment.setImages({ "imageUri": "http://imageUrl.com" });
                webhookFullfillment.setPlayAudio("gs://<bucket>/<object>");
                webhookFullfillment.setSynthesizeSpeech("Hi, Welcome to Quantiphi");
                webhookFullfillment.setTransferCall("7738071969");
                webhookFullfillment.setPayload({
                    "facebook": {
                        "attachment": {
                            "type": "audio",
                            "payload": {
                                "url": "https://example.com/audio/test.mp3"
                            }
                        }
                    }
                });
                let _response = webhookFullfillment.getCompiledResponse();
                expectedResponse.should.deep.equal(_response);
                done();
            });
        });
        describe("setBrowseCarouselCards() function check", () => {
            beforeEach(done => {
                done();
            });
            afterEach(done => {
                done();
            });
            it("should return proper output for the proper input", (done) => {
                let expectedConfig = {
                    "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
                };
                let expectedRequest = {};
                let expectedResponse = {
                    "fulfillmentText": "",
                    "fulfillmentMessages": [
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "simpleResponses": {
                                "simpleResponses": [
                                    {
                                        "textToSpeech": "Hello, Quantiphi welcomes you",
                                        "displayText": "Hello, Quantiphi welcomes you"
                                    }
                                ]
                            }
                        },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "browseCarouselCard": {
                                "items": [{
                                    "openUriAction": {
                                        "url": "https://optionOneUrl",
                                        "urlTypeHint": "AMP_CONTENT"
                                    },
                                    "title": "Option one title",
                                    "description": "Option one description",
                                    "image": {
                                        "imageUri": "http://imageOneUrl.com",
                                        "accessibilityText": "Image description for screen readers"
                                    },
                                    "footer": "Option one footer"
                                }, {
                                    "openUriAction": {
                                        "url": "https://optionTwoUrl",
                                        "urlTypeHint": ""
                                    },
                                    "title": "Option two title",
                                    "description": "",
                                    "image": {},
                                    "footer": ""
                                }]
                            }
                        }
                    ],
                    "outputContexts": []
                }
                let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                webhookFullfillment.setSimpleResponses("Hello, Quantiphi welcomes you", "Hello, Quantiphi welcomes you");
                webhookFullfillment.setBrowseCarouselCards([{
                    "title": "Option one title",
                    "url": "https://optionOneUrl",
                    "urlTypeHint": "AMP_CONTENT",
                    "description": "Option one description",
                    "imageUri": "http://imageOneUrl.com",
                    "imageAccessibilityText": "Image description for screen readers",
                    "footer": "Option one footer"
                }, {
                    "title": "Option two title",
                    "url": "https://optionTwoUrl"
                }]);
                let _response = webhookFullfillment.getCompiledResponse();
                expectedResponse.should.deep.equal(_response);
                done();
            });
            it("should throw an error if simpleResponses is not present in fulfillmentMessages array along with browseCarouselCard", (done) => {
                let expectedConfig = {
                    "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
                };
                let expectedRequest = {};
                let expectedErrorMsg = "Google Assistant 'simpleResponse' should be added to intent";
                try {
                    let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                    webhookFullfillment.setBrowseCarouselCards([{
                        "title": "Option one title",
                        "url": "https://optionOneUrl",
                        "urlTypeHint": "AMP_CONTENT",
                        "description": "Option one description",
                        "imageUri": "http://imageOneUrl.com",
                        "imageAccessibilityText": "Image description for screen readers",
                        "footer": "Option one footer"
                    }, {
                        "title": "Option two title",
                        "url": "https://optionTwoUrl"
                    }]);
                    let _response = webhookFullfillment.getCompiledResponse();
                    expectedResponse.should.deep.equal(_response);
                    done(new Error("should throw an error but did not"));
                } catch (err) {
                    expectedErrorMsg.should.equal(err.message);
                    done();
                }
            });
        });
        describe("setMediaContents() function check", () => {
            beforeEach(done => {
                done();
            });
            afterEach(done => {
                done();
            });
            it("should return proper output for the proper input", (done) => {
                let expectedConfig = {
                    "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
                };
                let expectedRequest = {};
                let expectedResponse = {
                    "fulfillmentText": "",
                    "fulfillmentMessages": [
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "simpleResponses": {
                                "simpleResponses": [
                                    {
                                        "textToSpeech": "Hello, Quantiphi welcomes you",
                                        "displayText": "Hello, Quantiphi welcomes you"
                                    }
                                ]
                            }
                        },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "suggestions": {
                                "suggestions": [
                                    { "title": "Suggestion 1" },
                                    { "title": "Suggestion 2" }
                                ]
                            }
                        }, {
                            "platform": "FACEBOOK",
                            "quickReplies": {
                                "title": "Suggestions Title",
                                "quickReplies": ["Suggestion 1", "Suggestion 2"]
                            }
                        },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "mediaContent": {
                                "mediaType": "AUDIO",
                                "mediaObjects": [{
                                    "name": "Media content card title",
                                    "description": "Media Content card description",
                                    "largeImage": {
                                        "imageUri": "http://imageUrl.com",
                                        "accessibilityText": "Image description for screen readers"
                                    },
                                    "contentUrl": "https://urlToMediaFile.com"
                                }]
                            }
                        }
                    ],
                    "outputContexts": []
                }
                let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                webhookFullfillment.setSimpleResponses("Hello, Quantiphi welcomes you", "Hello, Quantiphi welcomes you");
                webhookFullfillment.setSuggestions({
                    "title": "Suggestions Title",
                    "suggestions": ["Suggestion 1", "Suggestion 2"]
                });
                webhookFullfillment.setMediaContents({
                    "mediaType": "AUDIO",
                    "mediaObjects": [{
                        "name": "Media content card title",
                        "contentUrl": "https://urlToMediaFile.com",
                        "description": "Media Content card description",
                        "mediaContentType": "largeImage",
                        "imageUri": "http://imageUrl.com",
                        "imageAccessibilityText": "Image description for screen readers",
                    }]
                });
                let _response = webhookFullfillment.getCompiledResponse();
                expectedResponse.should.deep.equal(_response);
                done();
            });
            it("should throw an error if simpleResponses and suggestion chips are not present in fulfillmentMessages array along with mediaContents", (done) => {
                let expectedConfig = {
                    "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
                };
                let expectedRequest = {};
                let expectedErrorMsg = "Google Assistant 'simpleResponse' and 'suggestions' should be added to intent";
                try {
                    let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                    webhookFullfillment.setMediaContents([{
                        "title": "Option one title",
                        "url": "https://optionOneUrl",
                        "urlTypeHint": "AMP_CONTENT",
                        "description": "Option one description",
                        "imageUri": "http://imageOneUrl.com",
                        "imageAccessibilityText": "Image description for screen readers",
                        "footer": "Option one footer"
                    }, {
                        "title": "Option two title",
                        "url": "https://optionTwoUrl"
                    }]);
                    let _response = webhookFullfillment.getCompiledResponse();
                    expectedResponse.should.deep.equal(_response);
                    done(new Error("should throw an error but did not"));
                } catch (err) {
                    expectedErrorMsg.should.equal(err.message);
                    done();
                }
            });
            it("should throw an error if simpleResponses is not present in fulfillmentMessages array along with mediaContents and suggestions", (done) => {
                let expectedConfig = {
                    "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
                };
                let expectedRequest = {};
                let expectedErrorMsg = "Google Assistant 'simpleResponse' should be added to intent";
                try {
                    let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                    webhookFullfillment.setSuggestions({
                        "title": "Suggestions Title",
                        "suggestions": ["Suggestion 1", "Suggestion 2"]
                    });
                    webhookFullfillment.setMediaContents([{
                        "title": "Option one title",
                        "url": "https://optionOneUrl",
                        "urlTypeHint": "AMP_CONTENT",
                        "description": "Option one description",
                        "imageUri": "http://imageOneUrl.com",
                        "imageAccessibilityText": "Image description for screen readers",
                        "footer": "Option one footer"
                    }, {
                        "title": "Option two title",
                        "url": "https://optionTwoUrl"
                    }]);
                    let _response = webhookFullfillment.getCompiledResponse();
                    expectedResponse.should.deep.equal(_response);
                    done(new Error("should throw an error but did not"));
                } catch (err) {
                    expectedErrorMsg.should.equal(err.message);
                    done();
                }
            });
            it("should throw an error if suggestions is not present in fulfillmentMessages array along with mediaContents and simpleResponses", (done) => {
                let expectedConfig = {
                    "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
                };
                let expectedRequest = {};
                let expectedErrorMsg = "Google Assistant 'suggestions' should be added to intent";
                try {
                    let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                    webhookFullfillment.setSimpleResponses("Hello, Quantiphi welcomes you", "Hello, Quantiphi welcomes you");
                    webhookFullfillment.setMediaContents([{
                        "title": "Option one title",
                        "url": "https://optionOneUrl",
                        "urlTypeHint": "AMP_CONTENT",
                        "description": "Option one description",
                        "imageUri": "http://imageOneUrl.com",
                        "imageAccessibilityText": "Image description for screen readers",
                        "footer": "Option one footer"
                    }, {
                        "title": "Option two title",
                        "url": "https://optionTwoUrl"
                    }]);
                    let _response = webhookFullfillment.getCompiledResponse();
                    expectedResponse.should.deep.equal(_response);
                    done(new Error("should throw an error but did not"));
                } catch (err) {
                    expectedErrorMsg.should.equal(err.message);
                    done();
                }
            });
        });
        describe("setTableCards() function check", () => {
            beforeEach(done => {
                done();
            });
            afterEach(done => {
                done();
            });
            it("should return proper output for the proper input", (done) => {
                let expectedConfig = {
                    "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
                };
                let expectedRequest = {};
                let expectedResponse = {
                    "fulfillmentText": "",
                    "fulfillmentMessages": [
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "simpleResponses": {
                                "simpleResponses": [
                                    {
                                        "textToSpeech": "Hello, Quantiphi welcomes you",
                                        "displayText": "Hello, Quantiphi welcomes you"
                                    }
                                ]
                            }
                        },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "tableCard": {
                                "title": "Table Card title",
                                "subtitle": "Table Card subtitle",
                                "image": {
                                    "imageUri": "http://imageUrl.com",
                                    "accessibilityText": "Image description for screen readers"
                                },
                                "columnProperties": [{
                                    "header": "Header 1",
                                    "horizontalAlignment": "CENTER"
                                }, {
                                    "header": "Header 2",
                                    "horizontalAlignment": "LEADING"
                                }],
                                "rows": [{
                                    "cells": [{ "text": "Cell A1" }, { "text": "Cell A2" }],
                                    "dividedAfter": true
                                }, {
                                    "cells": [{ "text": "" }, { "text": "Cell B2" }],
                                    "dividedAfter": false
                                }],
                                "buttons": [{
                                    "title": "Button title",
                                    "openUriAction": {
                                        "uri": "https://linkUrl.com"
                                    }
                                }]
                            }
                        }
                    ],
                    "outputContexts": []
                }
                let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                webhookFullfillment.setSimpleResponses("Hello, Quantiphi welcomes you", "Hello, Quantiphi welcomes you");
                webhookFullfillment.setTableCards({
                    "title": "Table Card title",
                    "subtitle": "Table Card subtitle",
                    "imageUri": "http://imageUrl.com",
                    "imageAccessibilityText": "Image description for screen readers",
                    "columnProperties": [{
                        "header": "Header 1",
                        "horizontalAlignment": "CENTER"
                    }, {
                        "header": "Header 2"
                    }],
                    "rows": [{
                        "cells": [{ "text": "Cell A1" }, { "text": "Cell A2" }],
                        "dividedAfter": true
                    }, {
                        "cells": [{}, { "text": "Cell B2" }]
                    }],
                    "buttons": [{
                        "title": "Button title",
                        "uri": "https://linkUrl.com"
                    }]
                });
                let _response = webhookFullfillment.getCompiledResponse();
                expectedResponse.should.deep.equal(_response);
                done();
            });
            it("should throw an error if simpleResponses is not present in fulfillmentMessages array along with tableCard", (done) => {
                let expectedConfig = {
                    "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
                };
                let expectedRequest = {};
                let expectedErrorMsg = "Google Assistant 'simpleResponse' should be added to intent";
                try {
                    let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                    webhookFullfillment.setTableCards({
                        "title": "Table Card title",
                        "subtitle": "Table Card subtitle",
                        "imageUri": "http://imageUrl.com",
                        "imageAccessibilityText": "Image description for screen readers",
                        "columnProperties": [{
                            "header": "Header 1",
                            "horizontalAlignment": "CENTER"
                        }, {
                            "header": "Header 2"
                        }],
                        "rows": [{
                            "cells": [{ "text": "Cell A1" }, { "text": "Cell A2" }],
                            "dividedAfter": true
                        }, {
                            "cells": [{}, { "text": "Cell B2" }]
                        }],
                        "buttons": [{
                            "title": "Button title",
                            "uri": "https://linkUrl.com"
                        }]
                    });
                    let _response = webhookFullfillment.getCompiledResponse();
                    expectedResponse.should.deep.equal(_response);
                    done(new Error("should throw an error but did not"));
                } catch (err) {
                    expectedErrorMsg.should.equal(err.message);
                    done();
                }
            });
        });
    });
    describe("checking if config is proper or not", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should throw an error if config object does not have platformsEnabled array as key or if platformsEnabled is an empty array", (done) => {
            let expectedConfig = {};  //or
            // let expectedConfig = {
            //     "platformsEnabled": []
            // }
            let expectedRequest = {};
            let expectedErrorMsg = "Malformed parameters";
            try {
                let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if platformsEnabled has a platform which is currently not supported by the library", (done) => {
            let expectedConfig = {
                "platformsEnabled": ["HANGOUTS"]
            }
            let expectedRequest = {};
            let expectedErrorMsg = "platform - HANGOUTS not supported";
            try {
                let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
                done(new Error("should throw an error but did not"));
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("getContext() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return outputContext object of the given intent name if it exists", (done) => {
            let expectedConfig = {
                "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
            };
            let expectedRequest = {
                "responseId": "a89ac094-f298-4d73-877b-2408a09bc076-b81332aa",
                "queryResult": {
                    "queryText": "pratyush",
                    "action": "event_prospectus.event_prospectus-yes.event_prospectus-yes-custom",
                    "parameters": {
                        "username": "pratyush"
                    },
                    "allRequiredParamsPresent": true,
                    "fulfillmentText": "Alright, pratyush , please tell me your email ID.",
                    "fulfillmentMessages": [
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "simpleResponses": {
                                "simpleResponses": [
                                    {
                                        "textToSpeech": "Thanks pratyush, could you please tell me your email id."
                                    }
                                ]
                            }
                        },
                        {
                            "platform": "ACTIONS_ON_GOOGLE",
                            "suggestions": {
                                "suggestions": [
                                    {
                                        "title": "Back"
                                    }
                                ]
                            }
                        },
                        {
                            "text": {
                                "text": [
                                    "Alright, pratyush , please tell me your email ID."
                                ]
                            }
                        }
                    ],
                    "outputContexts": [
                        {
                            "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup",
                            "lifespanCount": 2,
                            "parameters": {
                                "username": "pratyush",
                                "username.original": "pratyush"
                            }
                        },
                        {
                            "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus-yes-followup",
                            "lifespanCount": 1,
                            "parameters": {
                                "username": "pratyush",
                                "username.original": "pratyush"
                            }
                        },
                        {
                            "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus-followup",
                            "parameters": {
                                "username": "pratyush",
                                "username.original": "pratyush"
                            }
                        },
                        {
                            "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/user_event_data",
                            "lifespanCount": 97,
                            "parameters": {
                                "username": "pratyush",
                                "username.original": "pratyush"
                            }
                        }
                    ],
                    "intent": {
                        "name": "projects/events-development-txhmsx/agent/intents/117e7b33-e5ab-414d-a355-eeb9feed1731",
                        "displayName": "event_prospectus_yes_name"
                    },
                    "intentDetectionConfidence": 1,
                    "languageCode": "en"
                },
                "originalDetectIntentRequest": {
                    "payload": {}
                },
                "session": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254"
            };
            let expectedOutputContext = {
                "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup",
                "lifespanCount": 2,
                "parameters": {
                    "username": "pratyush",
                    "username.original": "pratyush"
                }
            }
            let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
            let outputContext = webhookFullfillment.getContext("projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup");
            expectedOutputContext.should.deep.equal(outputContext);
            done();
        });
        it("should return null if the given intent doesn't exist in the request object", (done) => {
            let expectedConfig = {
                "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
            };
            let expectedRequest = {};
            let expectedOutputContext = null;
            let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
            let outputContext = webhookFullfillment.getContext("Default Welcome Intent");
            expect(expectedOutputContext).to.eql(outputContext);
            done();
        });
    });
    describe("setOutputContext() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should set the outputContexts of the given intent with the given parameters", (done) => {
            let expectedConfig = {
                "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
            };
            let expectedRequest = {
                "queryResult": {
                    "outputContexts": [
                        {
                            "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup",
                            "lifespanCount": 2,
                            "parameters": {
                                "username": "pratyush",
                                "username.original": "pratyush"
                            }
                        },
                        {
                            "name": "global",
                            "lifespanCount": 2,
                            "parameters": {
                                "username": "yash",
                                "username.original": "yash"
                            }
                        }
                    ]
                },
                "session": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254"
            }
            let expectedResponse = {
                "fulfillmentText": "",
                "fulfillmentMessages": [],
                "outputContexts": [{
                    "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup",
                    "lifespanCount": 7,
                    "parameters": {
                        "username": "yash",
                        "username.original": "yash"
                    }
                }, {
                    "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/default_fallback_intent",
                    "lifespanCount": 3,
                    "parameters": {}
                }]
            }
            let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
            webhookFullfillment.setOutputContext("projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup", 7, { "username": "yash", "username.original": "yash" });
            webhookFullfillment.setOutputContext("default_fallback_intent", 3);
            let _response = webhookFullfillment.getCompiledResponse();
            expectedResponse.should.deep.equal(_response);
            done();
        });
    });
    describe("setEvent() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper response with followupEventInput set", (done) => {
            let expectedConfig = {
                "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
            };
            let expectedRequest = {};
            let expectedResponse = {
                "fulfillmentText": "",
                "fulfillmentMessages": [],
                "outputContexts": [],
                "followupEventInput": {
                    "name": "Default Welcome Intent",
                    "languageCode": "en-US",
                    "parameters": {}
                }
            }
            let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
            webhookFullfillment.setEvent("Default Welcome Intent");
            let _response = webhookFullfillment.getCompiledResponse();
            expectedResponse.should.deep.equal(_response);
            done();
        });
    });
    describe("getErrorResponse() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper error response message", (done) => {
            let expectedConfig = {
                "platformsEnabled": ["ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY"]
            };
            let expectedRequest = {};
            let expectedErrorResponseMsg = {
                "queryResult": {
                    "webhookStatus": {
                        "code": 3,
                        "message": "Webhook service failed."
                    }
                }
            };
            let webhookFullfillment = new webhook_fullfillment(expectedConfig, expectedRequest);
            let errorResponseMsg = webhookFullfillment.getErrorResponse();
            expectedErrorResponseMsg.should.deep.equal(errorResponseMsg);
            done();
        });
    });
});