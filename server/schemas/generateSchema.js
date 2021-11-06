"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
function generateSchema(objectClass) {
    var objToSchema = {};
    // @ts-ignore
    var newObject = new objectClass();
    var objKeys = Object.getOwnPropertyNames(newObject);
    objKeys.forEach(function (keys) {
        var _a;
        if (keys !== '_id') {
            var ob = (_a = {},
                _a[keys] = typeof newObject[keys],
                _a);
            objToSchema[keys] = ob[keys];
        }
    });
    return new mongoose_1.Schema(objToSchema);
}
exports.generateSchema = generateSchema;
