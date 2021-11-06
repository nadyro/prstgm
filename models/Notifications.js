"use strict";
exports.__esModule = true;
var Notifications = /** @class */ (function () {
    function Notifications() {
        this._id = '';
        this.requesterId = '';
        this.recipientId = '';
        this.dateEmitted = new Date();
        this.objectId = '';
        this.objectName = '';
        this.seen = false;
    }
    return Notifications;
}());
exports.Notifications = Notifications;
