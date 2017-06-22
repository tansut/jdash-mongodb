"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var DashletEntity = (function () {
    function DashletEntity() {
    }
    return DashletEntity;
}());
exports.DashletEntity = DashletEntity;
var Schema = (function (_super) {
    __extends(Schema, _super);
    function Schema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Schema.prototype.toClient = function (doc) {
        var result = _super.prototype.toClient.call(this, doc);
        return result;
    };
    return Schema;
}(_1.DBSchema));
var DashletSchema = new Schema({
    moduleId: { type: String, required: true },
    dashboardId: { type: String, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    createdAt: { type: Date, required: true },
    configuration: { type: Object, required: false }
}, { strict: false });
DashletSchema.index({
    dashboardId: 1,
}, {});
DashletSchema.index({
    dashboardId: 1,
    createdAt: 1
}, {});
exports.default = function (conn) {
    exports.DashletEntityModel = conn.model('jdash_dashlet', DashletSchema);
    return exports.DashletEntityModel;
};
//# sourceMappingURL=dashlet.js.map