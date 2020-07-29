const chai = require('chai')
const should = require('chai').should() // eslint-disable-line
const expect = require('chai').expect

const contextHelper = require("../helpers/context");

describe("getContext() function check", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    it("should return outputContext object of the given intent name if it exists", (done) => {
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
        let expectedInputName = "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup";
        let expectedOutputContext = {
            "name": "projects/events-development-txhmsx/agent/sessions/a32ceba5-cb0d-7c8b-25ba-6a47d3be1254/contexts/event_prospectus_yes_name-followup",
            "lifespanCount": 2,
            "parameters": {
                "username": "pratyush",
                "username.original": "pratyush"
            }
        }
        let outputContext = contextHelper.getContext(expectedRequest, expectedInputName);
        expectedOutputContext.should.deep.equal(outputContext);
        done();
    });
    it("should return null if the given intent doesn't exist in the request object", (done) => {
        let expectedRequest = {
            "queryResult": {
                "outputContexts": [
                    {
                        "name": "Welcome Intent"
                    }
                ]
            }
        };
        let expectedOutputContext = null;
        let outputContext = contextHelper.getContext(expectedRequest, "Default Welcome Intent");
        expect(expectedOutputContext).to.eql(outputContext);
        done();
    });
});