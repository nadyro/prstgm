"use strict";
exports.__esModule = true;
var express = require("express");
var DbUserConnectTS = require("../../server/controllers/auth/auth.connect");
var DbUserSaveTS = require("../../server/controllers/auth/auth.save-user");
var DbGetUsersTS = require("../../server/controllers/users/users.db");
var DbChatRequests = require("../../server/controllers/chat/chat.request");
var DbRooms = require("../../server/controllers/rooms/rooms.db");
exports.api = express.Router();
exports.api.post('/db/saveUser', DbUserSaveTS.saveUser);
exports.api.post('/db/connect', DbUserConnectTS.userConnection);
exports.api.post('/db/connectWithLS', DbUserConnectTS.userConnectionWithLS);
exports.api.post('/db/signOutUser', DbUserConnectTS.signOutUser);
exports.api.post('/db/updateUserSocketId', DbUserConnectTS.updateUserSocketId);
exports.api.get('/db/getUsers', DbGetUsersTS.getUsers);
exports.api.post('/db/getUsersById', DbGetUsersTS.getUserById);
exports.api.post('/db/getUserByEmail', DbGetUsersTS.getUserByEmail);
exports.api.post('/db/getUserBySocketId', DbUserConnectTS.getUserBySocketId);
exports.api.post('/db/initChatRequest', DbChatRequests.initChatRequest);
exports.api.post('/db/getChatRequests', DbChatRequests.getChatRequests);
exports.api.post('/db/getAllChatRequests', DbChatRequests.getAllChatRequests);
exports.api.post('/db/updateChatRequest', DbChatRequests.updateChatRequest);
exports.api.post('/db/initNewConversation', DbChatRequests.initNewConversation);
exports.api.post('/db/saveRoom', DbRooms.saveRoom);
exports.api.post('/db/getRoomsByUserId', DbRooms.getRoomsByUserId);
exports.api.post('/db/getAndUpdateRoomByChatRequestId', DbRooms.getAndUpdateRoomByChatRequestId);
exports.api.use('/prostagmaApi', exports.api);