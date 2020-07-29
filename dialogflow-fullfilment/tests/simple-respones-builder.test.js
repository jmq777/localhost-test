const chai = require('chai')
const should = require('chai').should() // eslint-disable-line

const simpleResponseBuilder = require("../response-builder/simple-respones-builder");

describe("Simple Responses Builder", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildSimpleResponseActionsOnGoogle() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedTextToSpeech1 = "Hello, Quantiphi welcomes you";
            let expectedDisplayText1 = "Hello, Quantiphi welcomes you";
            let expectedTextToSpeech2 = "Hi, Welcome to Quantiphi";
            let expectedOutputs = [{
                "platform": "ACTIONS_ON_GOOGLE",
                "simpleResponses": {
                    "simpleResponses": [
                        {
                            "textToSpeech": "Hello, Quantiphi welcomes you",
                            "displayText": "Hello, Quantiphi welcomes you"
                        }
                    ]
                }
            }, {
                "platform": "ACTIONS_ON_GOOGLE",
                "simpleResponses": {
                    "simpleResponses": [
                        {
                            "textToSpeech": "Hi, Welcome to Quantiphi",
                            "displayText": "Hi, Welcome to Quantiphi"
                        }
                    ]
                }
            }];
            let response1 = simpleResponseBuilder.buildSimpleResponseActionsOnGoogle(expectedTextToSpeech1, expectedDisplayText1);
            expectedOutputs[0].should.deep.equal(response1);
            let response2 = simpleResponseBuilder.buildSimpleResponseActionsOnGoogle(expectedTextToSpeech2);
            expectedOutputs[1].should.deep.equal(response2);
            done();
        });
        it("should throw an error if parameter 'textToSpeech' is not given in the input", (done) => {
            let expectedTextToSpeech = "";
            let expectedErrorMsg = "Parameter 'textToSpeech' is required";
            try {
                simpleResponseBuilder.buildSimpleResponseActionsOnGoogle(expectedTextToSpeech);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    })
});