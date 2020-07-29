"use strict";

const webhookFullfillment = require("../dialogflow-fullfilment");
const config = require("./../config")();
const intentMapper = require("./intent-mapper");

module.exports = (db) => {
    return async (req, res, next) => {
        try {
            const requestIntent = req.body.queryResult.intent.displayName;
            let fulfillment = new webhookFullfillment(config.fullfillmentConfig, req.body);

            let fishContext = fulfillment.getContext("fish_context");
            let fishContextParams = fishContext && fishContext.parameters || {};

            const intent = await intentMapper(requestIntent);
            if (intent) {
                await intent(fulfillment, fishContextParams, db);
            } else {
                const requiredIntent = getIntent(requestIntent);
                await require(requiredIntent)(fulfillment, fishContextParams, db);
            }

            let result = fulfillment.getCompiledResponse();
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };
};

const getIntent = (name) => {
    let file = name.toLowerCase();
    file = file.replace(/ +/g, "-");
    return `./intents/${file}`;
};
