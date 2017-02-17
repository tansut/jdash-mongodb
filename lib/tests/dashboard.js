"use strict";
var helper_1 = require("./helper");
function default_1() {
    describe('dashboard', function () {
        var newDashboard;
        it('should create a dashboard', function () {
            var provider = helper_1.default.provider;
            var newDashboard = {
                title: 'Foo title',
                description: 'eewrew',
                id: ""
            };
            return provider.createDashboard(newDashboard).then(function (result) {
                newDashboard = {
                    id: result.id,
                    title: newDashboard.title,
                    description: newDashboard.title
                };
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
