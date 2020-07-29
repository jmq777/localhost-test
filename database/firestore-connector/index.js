"use strict";

const { Firestore } = require("@google-cloud/firestore");

const connectionTest = async (firestore) => {
    const connection = await firestore.collection("test").doc("test1").get();
    if (!connection.exists) {
        await firestore.collection("test").doc("test1").set({
            test: "passed"
        });
    }
    return;
};

module.exports = async () => {
    const firestore = new Firestore();
    await connectionTest(firestore);
    return firestore;
};
