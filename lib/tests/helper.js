"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var _1 = require("../");
var Helper = (function () {
    function Helper() {
    }
    Helper.utcNow = function () {
        var now = new Date();
        var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        return now_utc;
    };
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
Helper.appid = "appid_" + Math.ceil(Math.random() * 999999);
exports.default = Helper;
//# sourceMappingURL=helper.js.map