"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    dashletModel: { type: String, required: true },
    dashboardId: { type: String, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    user: { type: String, required: true },
    createdAt: { type: Date, required: true },
    configuration: { type: Object, required: false }
});
DashletSchema.index({
    appid: 1,
    user: 1
}, {});
DashletSchema.index({
    appid: 1,
    createdAt: 1
}, {});
DashletSchema.index({
    appid: 1,
    shareWith: 1
}, {});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (conn) {
    exports.DashletEntityModel = conn.model('jdash_dashlet', DashletSchema);
    return exports.DashletEntityModel;
};
