const chai = require('chai')
const should = require('chai').should() // eslint-disable-line

const telephonyResponseBuilder = require("../response-builder/telephony-response-builder");

describe("Telephony response builder", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildPlayAudioTelephony() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInput = "gs://<bucket>/<object>";
            let expectedOutput = {
                "platform": "TELEPHONY",
                "telephonyPlayAudio": {
                    "audioUri": "gs://<bucket>/<object>"
                }
            }
            let response = telephonyResponseBuilder.buildPlayAudioTelephony(expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if 'audioUri' is not given in the input", (done) => {
            let expectedInput = "";
            let expectedErrorMsg = "Please enter an 'audioUri' and it should be a cloud storage object link";
            try {
                telephonyResponseBuilder.buildPlayAudioTelephony(expectedInput);
                done(new Error("should throw an error but did not"));                
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildSynthesizeSpeechTelephony() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInput = "Hi, Welcome to Quantiphi";
            let expectedOutput = {
                "platform": "TELEPHONY",
                "telephonySynthesizeSpeech": {
                    "text": "Hi, Welcome to Quantiphi"
                }
            }
            let response = telephonyResponseBuilder.buildSynthesizeSpeechTelephony(expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if 'text' is not given in the input", (done) => {
            let expectedInput = "";
            let expectedErrorMsg = "Please enter a response 'text'";
            try {
                telephonyResponseBuilder.buildSynthesizeSpeechTelephony(expectedInput);
                done(new Error("should throw an error but did not"));                
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildTransferCallTelephony() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInput = "7738071969";
            let expectedOutput = {
                "platform": "TELEPHONY",
                "telephonyTransferCall": {
                    "phoneNumber": "+17738071969"
                }
            }
            let response = telephonyResponseBuilder.buildTransferCallTelephony(expectedInput);
            expectedOutput.should.deep.equal(response);
            done();
        });
        it("should throw an error if 'text' is not given in the input", (done) => {
            let expectedInput = "";
            let expectedErrorMsg = "Please enter a 'phoneNumber' to which you want to transfer the call to";
            try {
                telephonyResponseBuilder.buildTransferCallTelephony(expectedInput);
                done(new Error("should throw an error but did not"));                
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
        it("should throw an error if 'phoneNumber' length is less than 10", (done) => {
            let expectedInput = "773807196";
            let expectedErrorMsg = "Please enter a valid 'phoneNumber'";
            try {
                telephonyResponseBuilder.buildTransferCallTelephony(expectedInput);
                done(new Error("should throw an error but did not"));                
            } catch (err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
});