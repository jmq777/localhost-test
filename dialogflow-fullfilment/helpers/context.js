"use strict";

/**
 * getContext returns contexts of a particular intent
 * @param {Object} request 
 * @param {String} name 
 */
const getContext = (request, name) => {
    if (request.queryResult && request.queryResult.outputContexts && request.queryResult.outputContexts.length > 0) {
        for (let i = 0; i < request.queryResult.outputContexts.length; i++ ) {
            if(request.queryResult.outputContexts[i]["name"].indexOf(name) > -1) {
                return request.queryResult.outputContexts[i];
            }
        }
    }
    return null;
}

/**
 * clearContext clears context of the intent given as input
 * @param {Object} request 
 * @param {String} name 
 */
const clearContext = (request, name) => {
    if (request.queryResult && request.queryResult.outputContexts && request.queryResult.outputContexts.length > 0) {
        for (let i = 0; i < request.queryResult.outputContexts.length; i++ ) {
            if(request.queryResult.outputContexts[i]["name"].indexOf(name) > -1) {
                request.queryResult.outputContexts[i]["lifespanCount"] = 0;
                request.queryResult.outputContexts[i]["parameters"] = {};
                return request.queryResult.outputContexts[i];
            }
        }
    }
}

module.exports = { getContext, clearContext };
