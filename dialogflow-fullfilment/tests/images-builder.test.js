const chai = require('chai')
const should = require('chai').should() // eslint-disable-line

const imagesBuilder = require("../response-builder/images-builder");

describe("Images Builder", () => {
    beforeEach(done => {
        done();
    });
    afterEach(done => {
        done();
    });
    describe("buildImageActionsOnGoogle() function check", () => {
        beforeEach(done => {
            done();
        });
        afterEach(done => {
            done();
        });
        it("should return proper output for the proper input", (done) => {
            let expectedInputs = [{
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": "Image description for screen readers"
            }, {
                "imageUri": "",
                "imageAccessibilityText": "Image description for screen readers"
            }];
            let expectedOutputs = [{
                "imageUri": "http://imageUrl.com",
                "accessibilityText": "Image description for screen readers"
            }, {}];
            expectedInputs.forEach((expectedInput, i) => {
                let response = imagesBuilder.buildImageActionsOnGoogle(expectedInput);
                expectedOutputs[i].should.deep.equal(response);
            });
            done();
        });
        it("should throw an error if 'imageAccessibilityText' is not given but 'imageUri' is given", (done) => {
            let expectedInput = {
                "imageUri": "http://imageUrl.com",
                "imageAccessibilityText": ""
            }
            let expectedErrorMsg = "Parameter 'imageAccessibilityText' is required";
            try {
                imagesBuilder.buildImageActionsOnGoogle(expectedInput);
                done(new Error("should throw an error but did not"));
            } catch(err) {
                expectedErrorMsg.should.equal(err.message);
                done();
            }
        });
    });
    describe("buildImageFacebookMessenger() function check", () => {
        it("should return proper output for the proper input", (done) => {
            let expectedInputs = [{
                "imageUri": "http://imageUrl.com"
            }, {
                "imageUri": ""
            }];
            let expectedOutputs = [{
                "platform": "FACEBOOK",
                "image": {
                    "imageUri": "http://imageUrl.com"
                }
            }, {}];
            expectedInputs.forEach((expectedInput, i) => {
                let response = imagesBuilder.buildImageFacebookMessenger(expectedInput);
                expectedOutputs[i].should.deep.equal(response);
            });
            done();
        });
    });
});