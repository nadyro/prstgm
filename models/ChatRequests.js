"use strict";
exports.__esModule = true;
var Users_1 = require("./Users");
var ChatRequests = /** @class */ (function () {
    function ChatRequests() {
        this._id = '';
        this.recipientSocketId = '';
        this.requesterSocketId = '';
        this.roomId = '';
        this.requester = new Users_1.Users();
        this.recipient = new Users_1.Users();
        this.creationDate = Date.now();
        this.fulfilled = false;
    }
    return ChatRequests;
}());
exports.ChatRequests = ChatRequests;
