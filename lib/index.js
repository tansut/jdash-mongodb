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
            title: e.title,
            shareWith: e.shareWith
        };
    };
    MongoDbProvider.prototype.searchDashboards = function (search, query) {
        var _this = this;
        query = query || {
            limit: 100,
            startFrom: 0
        };
        query.limit = Math.min(query.limit, 100);
        search = search || {};
        search.appid && (search.appid = (typeof search.appid == 'string' ? [search.appid] : search.appid));
        search.user && (search.user = (typeof search.user == 'string' ? [search.user] : search.user));
        search.shareWith && (search.shareWith = (typeof search.shareWith == 'string' ? [search.shareWith] : search.shareWith));
        var q = {};
        search.appid && (q.appid = { $in: search.appid });
        search.user && (q.user = { $in: search.user });
        var baseQuery = this.dashboardModel.find(q).sort({ createdAt: -1 }).skip(query.startFrom).limit(query.limit);
        var countQuery = this.dashboardModel.find(q).count();
        var selectQuery = baseQuery.then(function (dashEntities) {
            return dashEntities.map(_this.dashDocumentToDashModel);
        });
        var resultPromise = Promise.all([countQuery, baseQuery]).then(function (results) {
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
    MongoDbProvider.prototype.getDashboard = function (appid, id) {
        var _this = this;
        return this.dashboardModel.findOne({ _id: id, appid: appid }).then(function (item) { return _this.dashDocumentToDashModel(item); });
    };
    MongoDbProvider.prototype.createDashboard = function (appid, model) {
        var newEntity = {
            appid: appid,
            title: model.title,
            shareWith: model.shareWith,
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
