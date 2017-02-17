"use strict";
var MongoDbProvider = (function () {
    function MongoDbProvider(options) {
        this.options = options;
    }
    MongoDbProvider.prototype.getDashboardsOfUser = function (username, query) {
        return null;
    };
    MongoDbProvider.prototype.getDashboard = function (id) {
        return null;
    };
    MongoDbProvider.prototype.createDashboard = function (model) {
        return null;
    };
    return MongoDbProvider;
}());
exports.MongoDbProvider = MongoDbProvider;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (options) { return new MongoDbProvider(options); };
