"use strict";
var mongoose = require("mongoose");
var dashboard_1 = require("./db/dashboard");
var helper_1 = require("./helper");
var MongoDbProvider = (function () {
    function MongoDbProvider(options) {
        this.options = options;
        this.connection = options.connection;
        this.dashboardModel = dashboard_1.default(this.connection);
    }
    MongoDbProvider.prototype.dashDocumentToDashModel = function (e) {
        return {
            config: e.config,
            description: e.description,
            id: e._id.toString(),
            layout: e.layout,
            title: e.title
        };
    };
    MongoDbProvider.prototype.getDashboardsOfUser = function (username, query) {
        var _this = this;
        var userQuery = this.dashboardModel.find({ 'user': username });
        var countQuery = this.dashboardModel.find({ 'user': username }).count();
        var selectQuery;
        if (query) {
            selectQuery = userQuery.sort({ createdAt: -1 }).skip(query.startFrom).limit(query.limit);
        }
        else {
            selectQuery = userQuery;
        }
        selectQuery = selectQuery.then(function (dashEntities) {
            return dashEntities.map(_this.dashDocumentToDashModel);
        });
        var resultPromise = Promise.all([countQuery, userQuery]).then(function (results) {
            var count = results[0];
            var models = results[1];
            var hasMore = false;
            if (query) {
                if (query.limit + query.startFrom < count)
                    hasMore = true;
            }
            else {
                hasMore = count > models.length;
            }
            var returnValue = {
                data: models,
                hasMore: hasMore
            };
            return returnValue;
        });
        return resultPromise;
    };
    MongoDbProvider.prototype.getDashboard = function (id) {
        var _this = this;
        return this.dashboardModel.findById(id).then(function (item) { return _this.dashDocumentToDashModel(item); });
    };
    MongoDbProvider.prototype.createDashboard = function (model) {
        var newEntity = {
            title: model.title,
            description: model.description,
            user: model.user,
            createdAt: helper_1.default.utcNow(),
            config: model.config || {},
            layout: {
                config: {},
                dashlets: {}
            }
        };
        return this.dashboardModel.create(newEntity).then(function (newDocument) {
            var createResult = {
                id: newDocument._id.toString()
            };
            return createResult;
        });
    };
    return MongoDbProvider;
}());
exports.MongoDbProvider = MongoDbProvider;
mongoose.Promise = global.Promise;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (options) { return new MongoDbProvider(options); };
