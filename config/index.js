"use strict";

const loadConfig = () => {
    switch (process.env.NODE_ENV) {
    case "production":
        return {
            "port": process.env.PORT || 8080,
            "fullfillmentConfig": {
                "platformsEnabled": ["ACTIONS_ON_GOOGLE", "TELEPHONY"]
            },
            "auth": {
                "enable": true,
                "username": process.env.USER_NAME,
                "password": process.env.PASSWORD
            },
            "logger": {
                "piiFields": []
            },
            "databases": [
                {
                    "type": "firestore",
                    "enable": false,
                    "connector": require("../database/firestore-connector")
                },
            ],
            "projectId": process.env.PROJECTID
        };
    case "staging":
        return {
            "port": process.env.PORT || 8080,
            "fullfillmentConfig": {
                "platformsEnabled": ["ACTIONS_ON_GOOGLE", "TELEPHONY"]
            },
            "auth": {
                "enable": false,
                "username": process.env.USER_NAME,
                "password": process.env.PASSWORD
            },
            "logger": {
                "piiFields": []
            },
            "databases": [
                {
                    "type": "firestore",
                    "enable": false,
                    "connector": require("../database/firestore-connector")
                },
            ],
            "projectId": process.env.PROJECTID
        };
    case "development":
        return {
            "port": process.env.PORT || 8080,
            "fullfillmentConfig": {
                "platformsEnabled": ["ACTIONS_ON_GOOGLE", "TELEPHONY"]
            },
            "auth": {
                "enable": true,
                "username": "webhook_user@quantiphi.com",
                "password": "Quant1ph1"
            },
            "logger": {
                "piiFields": []
            },
            "databases": [
                {
                    "type": "firestore",
                    "enable": false,
                    "connector": require("../database/firestore-connector")
                },
            ],
            "projectId": process.env.PROJECTID
        };
    default:
        return {
            "port": 8080,
            "fullfillmentConfig": {
                "platformsEnabled": ["ACTIONS_ON_GOOGLE", "TELEPHONY"]
            },
            "auth": {
                "enable": true,
                "username": "webhook_user@quantiphi.com",
                "password": "Quant1ph1"
            },
            "logger": {
                "piiFields": []
            },
            "databases": [
                {
                    "type": "firestore",
                    "enable": false,
                    "connector": require("../database/firestore-connector")
                },
            ],
            "projectId": "your_project_id"
        };
    }
};

module.exports = loadConfig;
