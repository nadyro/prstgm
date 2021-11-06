"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var db_tools_1 = require("../../tools/db/db.tools");
var errorCodes_1 = require("../../tools/errors/errorCodes");
var ObjectId = require('mongodb').ObjectID;
function sendAuthResults(docs, password) {
    var authResults;
    if (docs) {
        if (docs.password === password) {
            console.log("Login Successful");
            authResults = {
                credentials: {
                    expiresIn: 7200,
                    accessToken: '123'
                },
                object: docs,
                success: true,
                message: 'Login successful !'
            };
            return (authResults);
        }
        else {
            authResults = {
                credentials: null,
                object: null,
                success: false,
                message: 'Email or password incorrect.'
            };
            return (authResults);
        }
    }
    else {
        console.log("This email doesn't exist in our database.");
        authResults = {
            credentials: null,
            object: null,
            success: false,
            message: 'This email doesn\'t exist in our database.'
        };
        return (authResults);
    }
}
exports.userConnectionWithLS = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResults, dbConnection_1;
    return __generator(this, function (_a) {
        try {
            dbConnection_1 = db_tools_1.dbConnect('prostagma');
            console.log('Attempting to log in...');
            dbConnection_1.on('error', function (err) {
                console.error(err);
            });
            dbConnection_1.once('open', function () {
                var collection = dbConnection_1.collection('users');
                collection.findOne({ email: req.body.email }, function (err, doc) {
                    authResults = sendAuthResults(doc, doc.password);
                    dbConnection_1.close();
                    return res.send(authResults);
                });
            });
        }
        catch (e) {
            throw Error(e);
        }
        return [2 /*return*/];
    });
}); };
exports.updateUserSocketId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbConnection_2;
    return __generator(this, function (_a) {
        try {
            dbConnection_2 = db_tools_1.dbConnect('prostagma');
            console.log('Attempting to log in');
            dbConnection_2.on('error', function (err) {
                console.error(err);
            });
            dbConnection_2.once('open', function () {
                var collection = dbConnection_2.collection('users');
                collection.findOneAndUpdate({
                    _id: ObjectId(req.query.userId)
                }, {
                    $set: {
                        socketId: req.query.socketId
                    }
                }, {
                    returnOriginal: false
                }, function (err, doc) {
                    return res.send(doc.value);
                });
            });
        }
        catch (e) {
            throw Error(e);
        }
        return [2 /*return*/];
    });
}); };
exports.getUserBySocketId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbConnection_3;
    return __generator(this, function (_a) {
        try {
            dbConnection_3 = db_tools_1.dbConnect('prostagma');
            dbConnection_3.on('error', function (err) {
                console.error(err);
            });
            dbConnection_3.once('open', function () {
                var collection = dbConnection_3.collection('users');
                collection.find({ socketId: { $in: req.query.socketIds } })
                    .toArray(function (err, doc) {
                    if (doc.length > 0) {
                        return res.send(doc);
                    }
                    else
                        return res.send(errorCodes_1.ErrorCodes.NO_CONTENT);
                });
            });
        }
        catch (e) {
            throw Error(e);
        }
        return [2 /*return*/];
    });
}); };
exports.signOutUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_1, dbConnection_4;
    return __generator(this, function (_a) {
        try {
            dbConnection_4 = db_tools_1.dbConnect('prostagma');
            dbConnection_4.on('error', function (err) {
                console.error(err);
            });
            if (req.query.userID)
                id_1 = req.query.userID;
            else
                id_1 = req.body.userID;
            if (id_1) {
                dbConnection_4.once('open', function () {
                    var collection = dbConnection_4.collection('users');
                    collection.findOneAndUpdate({
                        _id: ObjectId(id_1)
                    }, {
                        $set: {
                            online: 0
                        }
                    }, {
                        returnOriginal: false
                    }, function (err, doc) {
                        console.log(doc.value);
                        return res.send(doc);
                    });
                });
            }
        }
        catch (e) {
            throw Error(e);
        }
        return [2 /*return*/];
    });
}); };
exports.userConnection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResults, dbConnection_5;
    return __generator(this, function (_a) {
        try {
            dbConnection_5 = db_tools_1.dbConnect('prostagma');
            console.log('Attempting to log in...');
            console.log('TA GRNAD MERE');
            dbConnection_5.on('error', function (err) {
                console.error(err);
            });
            dbConnection_5.once('open', function () {
                var collection = dbConnection_5.collection('users');
                collection.findOne({ email: req.body.email }, (function (err, docs) {
                    authResults = sendAuthResults(docs, req.body.password);
                    if (authResults.success === true) {
                        collection.findOneAndUpdate({
                            _id: ObjectId(docs._id)
                        }, {
                            $set: {
                                online: 1
                            }
                        }, {
                            returnOriginal: false
                        }, function (e, doc) {
                        });
                    }
                    dbConnection_5.close();
                    return res.send(authResults);
                }));
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
        return [2 /*return*/];
    });
}); };
