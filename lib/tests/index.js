"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var dashboard_1 = require("./dashboard");
var dashlet_1 = require("./dashlet");
require('should');
describe('jdash-mongodb Tests', function () {
    before(function (done) {
        var connStr = "mongodb://localhost/jdash-test";
        helper_1.default.createConnection(connStr).then(function (conn) {
            helper_1.default.createProvider({
                connection: conn
            });
            done();
        }).catch(function (err) { return done(err); });
    });
    dashboard_1.default();
    dashlet_1.default();
    after(function () {
    });
});
//# sourceMappingURL=index.js.map