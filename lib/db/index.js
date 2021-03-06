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
var mongoose = require("mongoose");
var DBSchema = (function (_super) {
    __extends(DBSchema, _super);
    function DBSchema(definition, options) {
        var _this = _super.call(this, definition, options) || this;
        var self = _this;
        _this.pre('save', function (next) {
            return self.preSave.apply(self, [this, next]);
        });
        _this.method('toClient', function () {
            return self.toClient.apply(self, [this]);
        });
        return _this;
    }
    DBSchema.prototype.toClient = function (doc, c) {
        var result;
        if (c) {
            result = new c();
            var docObject = doc.toObject();
            for (var prop in docObject) {
                if (docObject.hasOwnProperty(prop)) {
                    var propVal = doc[prop];
                    if (typeof propVal != 'undefined' && result.hasOwnProperty(prop))
                        result[prop] = propVal;
                }
            }
        }
        else
            result = doc.toObject();
        delete result['__v'];
        delete result['_meta'];
        return result;
    };
    DBSchema.prototype.preSave = function (doc, next) {
        next();
    };
    return DBSchema;
}(mongoose.Schema));
exports.DBSchema = DBSchema;
//# sourceMappingURL=index.js.map