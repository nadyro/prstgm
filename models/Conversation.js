"use strict";
exports.__esModule = true;
var ChatRequests_1 = require("./ChatRequests");
var Message_1 = require("./Message");
var Conversation = /** @class */ (function () {
    function Conversation() {
        this._id = '';
        this.chatRequestId = '';
        this.chatRequest = new ChatRequests_1.ChatRequests();
        this.message = new Message_1.Message();
        this.startingDate = 0;
        this.lastOpenedDate = 0;
    }
    return Conversation;
}());
exports.Conversation = Conversation;
