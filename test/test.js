/*
Copyright (c) 2014, Ryuichi Okumura. All rights reserved.
Code licensed under the BSD License:
https://github.com/okuryu/node-fastpay/blob/master/LICENSE
*/
/*global describe, it*/
var fastpay = require("../index"),
    echoecho = require("echoecho").EchoEcho,
    ee = new echoecho({all: true}),
    http = require("http"),
    expect = require("chai").expect,
    server;

const EE_BASE_URL = "http://127.0.0.1:8080";

server = http.createServer(function (req, res) {
    if (ee.handle(req)) {
        ee.serve(req, res);
    } else {
        console.log("Bad Request");
    }
});
server.listen(8080);

describe("Initialize Tests", function () {
    it("basic initialize", function () {
        var fp = fastpay({
            apiKey: "test_api_key"
        });
        expect(fp).to.be.an("object");
    });
    it("string initialize", function () {
        var fp = fastpay("test_api_key");
        expect(fp).to.be.an("object");
    });
    it("initialize with callback", function (done) {
        fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + "/echo/get?response=hello"
        }, function (err, res, body) {
            expect(err).to.be.equal(null);
            expect(res.statusCode).to.be.equal(200);
            expect(body).to.be.equal("hello");
            done();
        });
    });
    it("empty option", function () {
        expect(fastpay).to.throw(Error);
    });
    it("empty api key", function () {
        expect(function () {
            fastpay({});
        }).to.throw(Error);
    });
});

describe("Create Charge Tests", function () {
    it("basic create charge", function () {
        var fp = fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}'
        }).create({
            amount: 1000,
            card: "test_card_id"
        });
        expect(fp).to.be.an("object");
    });
    it("create charge with callback", function (done) {
        fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}'
        }).create({
            amount: 1000,
            card: "test_card_id",
            description: "charge for test",
            capture: false
        }, function (err, res, body) {
            expect(err).to.be.equal(null);
            expect(res.statusCode).to.be.equal(200);
            expect(JSON.parse(body)).to.have.keys(["id"]);
            done();
        });
    });
    it("empty option to create charge", function () {
        expect(function () {
            fastpay({
                apiKey: "test_api_key",
                requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}'
            }).create();
        }).to.throw(Error);
    });
    it("wrong amount to create charge", function () {
        expect(function () {
            fastpay({
                apiKey: "test_api_key",
                requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}'
            }).create({
                amount: true
            });
        }).to.throw(Error);
    });
    it("wrong card to create charge", function () {
        expect(function () {
            fastpay({
                apiKey: "test_api_key",
                requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}'
            }).create({
                amount: 1000,
                card: true
            });
        }).to.throw(Error);
    });
});

describe("Retrieve Charge Tests", function () {
    it("basic retrieve charge", function () {
        var fp = fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/get?response={"id":1}&postfix='
        }).retrieve("test_charge_id");
        expect(fp).to.be.an("object");
    });
    it("retrieve charge with callback", function (done) {
        fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/get?response={"id":1}&postfix='
        }).retrieve("test_charge_id", function (err, res, body) {
            expect(err).to.be.equal(null);
            expect(res.statusCode).to.be.equal(200);
            expect(JSON.parse(body)).to.have.keys(["id"]);
            done();
        });
    });
    it("empty id to retrieve charge", function () {
        expect(function () {
            fastpay({
                apiKey: "test_api_key",
                requestUrl: EE_BASE_URL + '/echo/get?response={"id":1}&postfix='
            }).retrieve();
        }).to.throw(Error);
    });
});

describe("Refund Charge Tests", function () {
    it("basic refund charge", function () {
        var fp = fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}&postfix='
        }).refund("test_charge_id");
        expect(fp).to.be.an("object");
    });
    it("refund charge with callback", function (done) {
        fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}&postfix='
        }).refund("test_charge_id", function (err, res, body) {
            expect(err).to.be.equal(null);
            expect(res.statusCode).to.be.equal(200);
            expect(JSON.parse(body)).to.have.keys(["id"]);
            done();
        });
    });
    it("empty id to refund charge", function () {
        expect(function () {
            fastpay({
                apiKey: "test_api_key",
                requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}&postfix='
            }).refund();
        }).to.throw(Error);
    });
});

describe("Capture Charge Tests", function () {
    it("basic capture charge", function () {
        var fp = fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}&postfix='
        }).capture("test_charge_id");
        expect(fp).to.be.an("object");
    });
    it("capture charge with callback", function (done) {
        fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}&postfix='
        }).capture("test_charge_id", function (err, res, body) {
            expect(err).to.be.equal(null);
            expect(res.statusCode).to.be.equal(200);
            expect(JSON.parse(body)).to.have.keys(["id"]);
            done();
        });
    });
    it("empty id to capture charge", function () {
        expect(function () {
            fastpay({
                apiKey: "test_api_key",
                requestUrl: EE_BASE_URL + '/echo/post?response={"id":1}&postfix='
            }).capture();
        }).to.throw(Error);
    });
});

describe("All Charge Tests", function () {
    it("basic all charge", function () {
        var fp = fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/get?response={"data":[]}'
        }).all();
        expect(fp).to.be.an("object");
    });
    it("all charge with option", function () {
        var fp = fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/get?response={"data":[]}'
        }).all({
            count: 1
        });
        expect(fp).to.be.an("object");
    });
    it("all charge with callback", function (done) {
        fastpay({
            apiKey: "test_api_key",
            requestUrl: EE_BASE_URL + '/echo/get?response={"data":[]}'
        }).all({
            count: 1
        }, function (err, res, body) {
            expect(err).to.be.equal(null);
            expect(res.statusCode).to.be.equal(200);
            expect(JSON.parse(body)).to.have.keys(["data"]);
            done();
        });
    });
});
