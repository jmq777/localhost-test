"use strict";

const intents = (intent) => {
    const mappedIntent = mapper[intent];
    if (mappedIntent)
        return mappedIntent;
    else
        return undefined;
};

const mapper = {
    "Default Welcome Intent": require("./intents/defaultWelcomeIntent"),
    "Test": require("./intents/test")
};

module.exports = intents;
