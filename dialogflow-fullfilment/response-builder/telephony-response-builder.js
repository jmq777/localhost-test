"use strict";

const logger = require("../logger");

/**
 * buildPlayAudioTelephony builds response for play audios for Telephony
 * @param {String} audioUri 
 * @example
 * "gs://<bucket>/<object> (required)"
 */
const buildPlayAudioTelephony = (audioUri) => {
    if(!audioUri) {
        logger.log("error", "Please enter an 'audioUri' and it should be a cloud storage object link")
        throw new Error("Please enter an 'audioUri' and it should be a cloud storage object link");
    }
    return {
        "platform": "TELEPHONY",
        "telephonyPlayAudio": {
            "audioUri": audioUri
        }
    }
}

/**
 * buildSynthesizeSpeechTelephony builds response for synthesize speech for Telephony
 * @param {String} text 
 * @example
 * "<Text to convert to audio> (required)"
 */
const buildSynthesizeSpeechTelephony = (text) => {
    if(!text) {
        throw new Error("Please enter a response 'text'");
    }
    return {
        "platform": "TELEPHONY",
        "telephonySynthesizeSpeech": {
            "ssml": text
        }
    }
}

/**
 * buildTransferCallTelephony builds response for transfer call for Telephony
 * @param {String} phoneNumber 
 * @example
 * "+1987654321 (required)"
 */
const buildTransferCallTelephony = (phoneNumber) => {
    if(!phoneNumber) {
        throw new Error("Please enter a 'phoneNumber' to which you want to transfer the call to");
    } else if(phoneNumber.length != 10) {
        throw new Error("Please enter a valid 'phoneNumber'");
    }
    return {
        "platform": "TELEPHONY",
        "telephonyTransferCall": {
            "phoneNumber": `+1${phoneNumber}`
        }
    }
}

module.exports = { buildPlayAudioTelephony, buildSynthesizeSpeechTelephony, buildTransferCallTelephony };
