"use strict";

const config = require("../config")();

module.exports = async () => {
    const databases = config["databases"];
    let types = [];
    let connection = [];
    await Promise.all(databases.map(async database => {
        if (database["enable"]) {
            types.push(database["type"]);
            const connect = await database["connector"]();
            connection[database["type"]] = connect;
        }
    }));
    return { types, connection };
};