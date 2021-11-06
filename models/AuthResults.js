"use strict";
exports.__esModule = true;
var Credentials_1 = require("./Credentials");
var Users_1 = require("./Users");
var AuthResults = /** @class */ (function () {
    function AuthResults() {
        this.success = false;
        this.object = new Users_1.Users();
        this.credentials = new Credentials_1.Credentials();
        this.message = '';
    }
    return AuthResults;
}());
exports.AuthResults = AuthResults;
