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
var Users_1 = require("../../../models/Users");
var generateSchema_1 = require("../../schemas/generateSchema");
var db_tools_1 = require("../../tools/db/db.tools");
var Credentials_1 = require("../../../models/Credentials");
var mongoose = require("mongoose");
var userSchema = generateSchema_1.generateSchema(Users_1.Users);
function sendAuthResults(err, data) {
    var authResults;
    var credential = new Credentials_1.Credentials();
    credential.accessToken = '';
    credential.expiresIn = 0;
    if (err) {
        console.error(err);
        authResults = {
            credentials: credential,
            object: data,
            success: false,
            message: 'Failed to create account.'
        };
        return (authResults);
    }
    else {
        authResults = {
            credentials: {
                expiresIn: 7200,
                accessToken: '123'
            },
            object: data,
            success: true,
            message: 'Subscription successful !'
        };
        return (authResults);
    }
}
exports.saveUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authResults_1, dbConnection;
    return __generator(this, function (_a) {
        try {
            dbConnection = db_tools_1.dbConnect('prostagma');
            dbConnection.on('error', function (err) {
                console.error(err);
            });
            dbConnection.once('open', function () {
                var User = mongoose.model('User', userSchema);
                var newUser = new User({
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username,
                    isAdmin: 1,
                    isAdminBool: 1,
                    online: 1
                });
                console.log(newUser);
                newUser.save(function (err, data) {
                    console.log(err);
                    authResults_1 = sendAuthResults(err, data);
                    return res.send(authResults_1);
                });
            });
        }
        catch (e) {
            throw Error(e);
        }
        return [2 /*return*/];
    });
}); };
