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
var generateSchema_1 = require("../../schemas/generateSchema");
var db_tools_1 = require("../../tools/db/db.tools");
var Notifications_1 = require("../../../models/Notifications");
var ChatRequests_1 = require("../../../models/ChatRequests");
var Conversation_1 = require("../../../models/Conversation");
var Message_1 = require("../../../models/Message");
var ObjectId = require('mongodb').ObjectID;
var mongoose = require("mongoose");
var notificationSchema = generateSchema_1.generateSchema(Notifications_1.Notifications);
var chatRequestSchema = generateSchema_1.generateSchema(ChatRequests_1.ChatRequests);
var conversationSchema = generateSchema_1.generateSchema(Conversation_1.Conversation);
function initNewConversation(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var dbConnection_1;
        return __generator(this, function (_a) {
            try {
                dbConnection_1 = db_tools_1.dbConnect('prostagma');
                dbConnection_1.on('error', function (err) {
                    console.error(err);
                });
                dbConnection_1.once('open', function () {
                    var ConversationModel = mongoose.model('Conversation', conversationSchema);
                    var collection = dbConnection_1.collection('conversations');
                    collection.findOneAndUpdate({ chatRequestId: req.query.chatRequestId }, {
                        $set: {
                            lastOpenedDate: Date.now()
                        }
                    }, { returnOriginal: false }, function (err, doc) {
                        console.log(doc);
                        var newConversation = doc.value;
                        if (newConversation) {
                            console.log('Conversation already exists. Resume chatting ! :)');
                            res.send(newConversation);
                        }
                        else {
                            console.log('New convo ! Have Fun !');
                            newConversation = new ConversationModel({
                                chatRequestId: req.query.chatRequestId,
                                chatRequest: req.query.chatRequest,
                                message: new Message_1.Message(),
                                startingDate: req.query.startingDate,
                                lastOpenedDate: req.query.lastOpenedDate
                            });
                            newConversation.save(function (e, data) {
                                if (!e) {
                                    res.send(data);
                                }
                                else {
                                    return null;
                                }
                            });
                        }
                    });
                });
            }
            catch (e) {
                throw Error(e);
            }
            return [2 /*return*/];
        });
    });
}
exports.initNewConversation = initNewConversation;
function initChatRequest(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var dbConnection_2;
        return __generator(this, function (_a) {
            try {
                dbConnection_2 = db_tools_1.dbConnect('prostagma');
                dbConnection_2.on('error', function (err) {
                    console.error(err);
                });
                dbConnection_2.once('open', function () {
                    var Notification = mongoose.model('Notification', notificationSchema);
                    var ChatRequest = mongoose.model('ChatRequest', chatRequestSchema);
                    var collection = dbConnection_2.collection('chatrequests');
                    collection.findOneAndUpdate({
                        $and: [
                            { roomId: { $regex: ".*" + req.query.requester._id + ".*" } },
                            { roomId: { $regex: ".*" + req.query.recipient._id + ".*" } }
                        ]
                    }, {
                        $set: {
                            requesterSocketId: req.query.requesterSocketId,
                            fulfilled: req.query.fulfilled
                        }
                    }, { returnOriginal: false }, function (error, doc) {
                        var chatRequest = doc.value;
                        if (chatRequest) {
                            var newNotification = new Notification({
                                requesterId: req.query.requesterId,
                                recipientId: req.query.recipientId,
                                dateEmitted: Date.now(),
                                objectId: chatRequest._id,
                                objectName: req.query.objectName,
                                seen: false
                            });
                            newNotification.save(function (err, notification) {
                                if (err) {
                                    console.log(err);
                                }
                                res.send(chatRequest);
                            });
                        }
                        else {
                            var newChatRequest = new ChatRequest({
                                recipientSocketId: req.query.recipientSocketId,
                                requesterSocketId: req.query.requesterSocketId,
                                roomId: req.query.roomId,
                                requester: req.query.requester,
                                recipient: req.query.recipient,
                                creationDate: req.query.creationDate,
                                fulfilled: req.query.fulfilled
                            });
                            newChatRequest.save(function (er, data) {
                                if (!er) {
                                    var newNotification = new Notification({
                                        requesterId: req.query.requesterId,
                                        recipientId: req.query.recipientId,
                                        dateEmitted: Date.now(),
                                        objectId: data._id,
                                        objectName: req.query.objectName,
                                        seen: false
                                    });
                                    newNotification.save(function (e, notification) {
                                        if (e) {
                                            console.log(e);
                                        }
                                        res.send(data);
                                    });
                                }
                                else {
                                    return null;
                                }
                            });
                        }
                    });
                });
            }
            catch (e) {
                throw (e);
            }
            return [2 /*return*/];
        });
    });
}
exports.initChatRequest = initChatRequest;
exports.getAllChatRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbConnection_3;
    return __generator(this, function (_a) {
        try {
            dbConnection_3 = db_tools_1.dbConnect('prostagma');
            dbConnection_3.on('error', function (err) {
                console.error(err);
            });
            dbConnection_3.once('open', function () {
                var collection = dbConnection_3.collection('chatrequests');
                collection.find({}).toArray(function (err, chatRequests) {
                    if (chatRequests) {
                        console.log('existing');
                    }
                    else {
                        console.log('not existing');
                    }
                    res.send(chatRequests);
                });
            });
        }
        catch (e) {
            throw (e);
        }
        return [2 /*return*/];
    });
}); };
exports.getChatRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chatRequestsToReturn_1, dbConnection_4;
    return __generator(this, function (_a) {
        try {
            chatRequestsToReturn_1 = new Array();
            dbConnection_4 = db_tools_1.dbConnect('prostagma');
            dbConnection_4.on('error', function (err) {
                console.error(err);
            });
            dbConnection_4.once('open', function () {
                var collection = dbConnection_4.collection('chatrequests');
                collection.find({}).toArray(function (err, chatRequest) {
                    chatRequest.forEach(function (cr) {
                        if (cr.recipient._id === req.body.recipientId || cr.requester._id === req.body.recipientId) {
                            chatRequestsToReturn_1.push(cr);
                        }
                    });
                    res.send(chatRequestsToReturn_1);
                });
            });
        }
        catch (e) {
            throw (e);
        }
        return [2 /*return*/];
    });
}); };
exports.updateChatRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbConnection_5;
    return __generator(this, function (_a) {
        try {
            dbConnection_5 = db_tools_1.dbConnect('prostagma');
            dbConnection_5.on('error', function (err) {
                console.error(err);
            });
            dbConnection_5.once('open', function () {
                var collection = dbConnection_5.collection('chatrequests');
                collection.findOneAndUpdate({
                    _id: ObjectId(req.query._id)
                }, {
                    $set: {
                        recipientSocketId: req.query.recipientSocketId,
                        fulfilled: req.query.fulfilled
                    }
                }, {
                    returnOriginal: false
                }, function (err, doc) {
                    res.send(doc.value);
                });
            });
        }
        catch (e) {
            throw (e);
        }
        return [2 /*return*/];
    });
}); };
