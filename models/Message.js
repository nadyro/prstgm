"use strict";
exports.__esModule = true;
var Users_1 = require("./Users");
var Message = /** @class */ (function () {
    function Message() {
        this._id = '';
        this.content = '';
        this.chatRequest = new Users_1.Users();
        this.chatRequestId = '';
        this.roomId = '';
        this.receptionDate = new Date();
        this.read = false;
        this.sender = new Users_1.Users();
    }
    return Message;
}());
exports.Message = Message;
