"use strict";
var mongoose = require("mongoose");
var dashboard_1 = require("./db/dashboard");
var MongoDbProvider = (function () {
    function MongoDbProvider(options) {
        this.options = options;
        this.connection = options.connection;
        this.dashboardModel = dashboard_1.default(this.connection);
    }
    MongoDbProvider.prototype.getDashboardsOfUser = function (username, query) {
        return null;
    };
    MongoDbProvider.prototype.getDashboard = function (id) {
        return null;
    };
    MongoDbProvider.prototype.createDashboard = function (model) {
        var newEntity = {
            title: model.title,
            description: model.description
        };
        return this.dashboardModel.create(newEntity).then(function (newDocument) {
            debugger;
            var createResult = {
                id: newDocument._id.toString()
            };
            return createResult;
        });
    };
    return MongoDbProvider;
}());
exports.MongoDbProvider = MongoDbProvider;
mongoose.set('debug', true);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (options) { return new MongoDbProvider(options); };
