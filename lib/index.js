"use strict";
var mongoose = require("mongoose");
var dashlet_1 = require("./db/dashlet");
var dashboard_1 = require("./db/dashboard");
var helper_1 = require("./helper");
var MongoDbProvider = (function () {
    function MongoDbProvider(options) {
        this.options = options;
        this.connection = options.connection;
        this.dashboardModel = dashboard_1.default(this.connection);
        this.dashletModel = dashlet_1.default(this.connection);
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
    MongoDbProvider.prototype.dashletDocumentToModel = function (e) {
        return {
            configuration: e.configuration,
            dashboardId: e.dashboardId,
            description: e.description,
            id: e._id.toString(),
            moduleId: e.moduleId,
            title: e.title
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
        var baseQuery = this.dashboardModel.find(q).sort({ createdAt: -1 }).skip(query.startFrom).limit(query.limit + 1);
        return baseQuery.then(function (dashEntities) {
            var models = dashEntities.map(_this.dashDocumentToDashModel);
            var hasMore = false;
            if (models.length > query.limit) {
                hasMore = true;
                models.splice(models.length - 1, 1);
            }
            var returnValue = {
                data: models,
                hasMore: hasMore
            };
            return returnValue;
        });
    };
    MongoDbProvider.prototype.getDashboard = function (appid, id) {
        var _this = this;
        return this.dashboardModel.findOne({ _id: id, appid: appid }).then(function (item) {
            var dashboard = _this.dashDocumentToDashModel(item);
            return _this.searchDashlets({
                dashboardId: dashboard.id
            }).then(function (dashlets) {
                return {
                    dashboard: dashboard,
                    dashlets: dashlets
                };
            });
        });
    };
    MongoDbProvider.prototype.createDashboard = function (model) {
        var newEntity = {
            appid: model.appid,
            title: model.title,
            shareWith: model.shareWith,
            description: model.description,
            user: model.user,
            createdAt: helper_1.default.utcNow(),
            config: model.config || {},
            layout: model.layout
        };
        return this.dashboardModel.create(newEntity).then(function (newDocument) {
            var createResult = {
                id: newDocument._id.toString()
            };
            return createResult;
        });
    };
    MongoDbProvider.prototype.deleteDashboard = function (appid, id) {
        return this.dashboardModel.findOne({ _id: id, appid: appid }).then(function (dashboard) {
            return dashboard.remove();
        });
    };
    MongoDbProvider.prototype.updateDashboard = function (appid, id, updateValues) {
        return this.dashboardModel.findOne({ _id: id, appid: appid }).then(function (dashboard) {
            Object.keys(updateValues).forEach(function (key) {
                dashboard[key] = updateValues[key];
            });
            return dashboard.save();
        });
    };
    MongoDbProvider.prototype.createDashlet = function (model) {
        var newEntity = {
            dashboardId: model.dashboardId,
            configuration: model.configuration || {},
            moduleId: model.moduleId,
            title: model.title,
            description: model.description,
            createdAt: helper_1.default.utcNow()
        };
        return this.dashletModel.create(newEntity).then(function (newDocument) {
            var createResult = {
                id: newDocument._id.toString()
            };
            return createResult;
        }).catch(function (err) {
            console.log(err);
            throw err;
        });
    };
    MongoDbProvider.prototype.searchDashlets = function (search) {
        var _this = this;
        var query = {
            dashboardId: search.dashboardId,
            user: {}
        };
        if (search.user instanceof Array)
            query.user = { $in: search.user };
        else
            query.user = search.user;
        return this.dashletModel.find(query).then(function (dashletEntities) {
            var models = dashletEntities.map(_this.dashletDocumentToModel);
            return models;
        });
    };
    MongoDbProvider.prototype.deleteDashlet = function (id) {
        return this.dashletModel.findById(id).then(function (dashletModel) {
            return dashletModel.remove();
        });
    };
    MongoDbProvider.prototype.updateDashlet = function (id, updateValues) {
        return this.dashletModel.findById(id).then(function (dashlet) {
            Object.keys(updateValues).forEach(function (key) {
                dashlet[key] = updateValues[key];
            });
            return dashlet.save();
        });
    };
    return MongoDbProvider;
}());
exports.MongoDbProvider = MongoDbProvider;
mongoose.Promise = global.Promise;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (options) { return new MongoDbProvider(options); };
