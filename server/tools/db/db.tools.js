"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
function dbConnect(database) {
    mongoose.connect('mongodb://localhost/' + database, { useNewUrlParser: true });
    var db = mongoose.connection;
    return db;
}
exports.dbConnect = dbConnect;
