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
            var oc = mongoose.connect(connStr);
            var conn = mongoose.connection;
            conn.on('connected', function (connx) {
                require('../db/dashboard').default(conn);
                resolve(conn);
            });
            conn.on('error', function (err) {
                reject(err);
            });
        });
    };
    return Helper;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Helper;
