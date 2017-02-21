"use strict";
var helper_1 = require("./helper");
var should = require('should');
function default_1() {
    var dashboardCount = 0;
    var maximumLimit = 100;
    describe('dashboard', function () {
        it('should create a dashboard', function () {
            var provider = helper_1.default.provider;
            var dashboardCreateModel = {
                title: 'Foo title',
                description: 'eewrew',
                id: "",
                layout: {
                    moduleId: 'foo'
                },
                user: helper_1.default.testUser
            };
            return provider.createDashboard(helper_1.default.appid, dashboardCreateModel).then(function (result) {
                dashboardCount++;
            });
        });
        it('should populate 100 dashboards for user', function () {
            var provider = helper_1.default.provider;
            var promises = [];
            for (var i = 0; i < 100; i++) {
                var dashboardCreateModel = {
                    title: 'Foo title' + i,
                    description: 'eewrew',
                    id: "",
                    layout: {
                        moduleId: "grid"
                    },
                    config: {},
                    user: helper_1.default.testUser
                };
                promises.push(provider.createDashboard(helper_1.default.appid, dashboardCreateModel));
            }
            return Promise.all(promises).then(function () {
                dashboardCount += promises.length;
            });
        });
        it('should create and gets the dashboard', function () {
            var provider = helper_1.default.provider;
            var newDashboard = {
                title: 'Foo title',
                description: 'eewrew',
                id: "",
                layout: {
                    moduleId: "grid"
                },
                user: helper_1.default.testUser
            };
            return provider.createDashboard(helper_1.default.appid, newDashboard).then(function (result) {
                dashboardCount++;
                return provider.getDashboard(helper_1.default.appid, result.id);
            });
        });
        it('should get users dashboards all', function () {
            var provider = helper_1.default.provider;
            return provider.searchDashboards({
                appid: helper_1.default.appid,
                user: helper_1.default.testUser
            }).then(function (dashes) {
                should.equal(dashes.data.length, maximumLimit);
                should.equal(dashes.hasMore, true);
            });
        });
        it('should get users first 5 dashboards', function () {
            var provider = helper_1.default.provider;
            return provider.searchDashboards({
                appid: helper_1.default.appid,
                user: helper_1.default.testUser
            }, { limit: 5, startFrom: 0 }).then(function (dashes) {
                should.equal(dashes.data.length, 5);
                should.equal(dashes.hasMore, true);
            });
        });
        it('should get users first 15 dashboards', function () {
            var provider = helper_1.default.provider;
            return provider.searchDashboards({
                appid: helper_1.default.appid,
                user: helper_1.default.testUser
            }, { limit: 15, startFrom: 0 }).then(function (dashes) {
                should.equal(dashes.data.length, 15);
                should.equal(dashes.hasMore, true);
            });
        });
        it('should have more dashboards', function () {
            var provider = helper_1.default.provider;
            return provider.searchDashboards({
                appid: helper_1.default.appid,
                user: helper_1.default.testUser
            }, { limit: 50, startFrom: 0 }).then(function (dashes) {
                should.equal(dashes.data.length, 50);
                should.equal(dashes.hasMore, true);
            });
        });
        it('should get users first 20 dashboard from start index 90', function () {
            var provider = helper_1.default.provider;
            return provider.searchDashboards({
                appid: helper_1.default.appid,
                user: helper_1.default.testUser
            }, { limit: 20, startFrom: 90 }).then(function (dashes) {
                var hasMore = true;
                var length = 20;
                if (dashboardCount > 90 + 20) {
                    length = dashboardCount - 90;
                    hasMore = false;
                }
                should.equal(dashes.data.length, length);
                should.equal(dashes.hasMore, hasMore);
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
