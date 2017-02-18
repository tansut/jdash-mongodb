"use strict";
var mongoose = require("mongoose");
var _1 = require("../");
var Helper = (function () {
    function Helper() {
    }
    Helper.createProvider = function (options) {
        this.provider = new _1.MongoDbProvider(options);
    };
    Helper.createConnection = function (connStr) {
        return new Promise(function (resolve, reject) {
            var conn = mongoose.createConnection(connStr);
            conn.on('connected', function (connx) {
                resolve(conn);
            });
            conn.on('error', function (err) {
                reject(err);
            });
        });
    };
    return Helper;
}());
Helper.testUser = "user_" + Math.ceil(Math.random() * 999999);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Helper;
