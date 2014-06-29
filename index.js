/*
Copyright (c) 2014, Ryuichi Okumura. All rights reserved.
Code licensed under the BSD License:
https://github.com/okuryu/node-fastpay/blob/master/LICENSE
*/

"use strict";

var request = require("request");

var BASE_REQUEST_URL = "https://fastpay.yahooapis.jp/v1/charges";

function FastPay(option, callback) {
    this.apiKey = option.apiKey;
    this.requestUrl = option.requestUrl || BASE_REQUEST_URL;
    request(this.requestUrl, {
        auth: {
            user: this.apiKey,
            pass: ""
        }
    }, function (err, res, body) {
        if (typeof callback === "function") {
            callback(err, res, body);
        }
    });
}

FastPay.prototype.create = function (option, callback) {
    var form = {};
    if (typeof option !== "object") {
        throw new Error("the option (object) is required.");
    }
    if (typeof option.amount !== "number" && typeof option.amount !== "string") {
        throw new Error("the option.amount (number or string) is required.");
    }
    if (typeof option.card !== "string") {
        throw new Error("the option.card (string) is required.");
    }
    form.amount = option.amount;
    form.card = option.card;
    if (typeof option.description === "string") {
        form.description = option.description;
    }
    if (typeof option.capture === "boolean") {
        form.capture = option.capture;
    }
    request.post(this.requestUrl, {
        auth: {
            user: this.apiKey,
            pass: ""
        },
        form: form
    }, function (err, res, body) {
        if (typeof callback === "function") {
            callback(err, res, body);
        }
    });
    return this;
};

FastPay.prototype.retrieve = function (id, callback) {
    if (typeof id !== "string") {
        throw new Error("the id (string) is required.");
    }
    this.requestUrl += "/" + id;
    request(this.requestUrl, {
        auth: {
            user: this.apiKey,
            pass: ""
        }
    }, function (err, res, body) {
        if (typeof callback === "function") {
            callback(err, res, body);
        }
    });
    return this;
};

FastPay.prototype.refund = function (id, callback) {
    if (typeof id !== "string") {
        throw new Error("the id (string) is required.");
    }
    this.requestUrl += "/" + id + "/refund";
    request.post(this.requestUrl, {
        auth: {
            user: this.apiKey,
            pass: ""
        },
        headers: {
            "Content-Length": 0
        }
    }, function (err, res, body) {
        if (typeof callback === "function") {
            callback(err, res, body);
        }
    });
    return this;
};

FastPay.prototype.capture = function (id, callback) {
    if (typeof id !== "string") {
        throw new Error("the id (string) is required.");
    }
    this.requestUrl += "/" + id + "/capture";
    request.post(this.requestUrl, {
        auth: {
            user: this.apiKey,
            pass: ""
        },
        headers: {
            "Content-Length": 0
        }
    }, function (err, res, body) {
        if (typeof callback === "function") {
            callback(err, res, body);
        }
    });
    return this;
};

FastPay.prototype.all = function (option, callback) {
    var qs = option || {};
    request(this.requestUrl, {
        auth: {
            user: this.apiKey,
            pass: ""
        },
        qs: qs
    }, function (err, res, body) {
        if (typeof callback === "function") {
            callback(err, res, body);
        }
    });
    return this;
};

function fastpay(option, callback) {
    var fp,
        opt;
    if (typeof option === "string") {
        opt = {
            apiKey: option
        };
    } else if (typeof option === "object") {
        if (typeof option.apiKey !== "string") {
            throw new Error("the option.apiKey (string) is required.");
        }
        opt = option;
    } else {
        throw new Error("the option (object or string) is required.");
    }
    fp = new FastPay(opt, callback);
    return fp;
}

module.exports = fastpay;
