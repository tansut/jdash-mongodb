"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _1 = require("./");
var DashboardEntity = (function () {
    function DashboardEntity() {
    }
    return DashboardEntity;
}());
exports.DashboardEntity = DashboardEntity;
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
var DashboardSchema = new Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    user: { type: String, required: true },
    createdAt: { type: Date, required: true },
    layout: { type: Object, required: true }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (conn) {
    exports.DashboardEntityModel = conn.model('jdash_dashboard', DashboardSchema);
    return exports.DashboardEntityModel;
};
