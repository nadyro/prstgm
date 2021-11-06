"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const io = __importStar(require("socket.io-client"));
const environment_1 = require("../../environments/environment");
let ChatService = class ChatService {
    constructor(httpClient, authService) {
        this.httpClient = httpClient;
        this.authService = authService;
        this.dataObservable = new rxjs_1.Observable();
        this.userDisconnection = new rxjs_1.Observable();
        this.userReconnection = new rxjs_1.Observable();
        this.joinNotifier = new rxjs_1.Observable();
        this.newConversation = new rxjs_1.Observable();
        this.pushConnectedUser = new rxjs_1.Observable();
        this.messageNotifier = new core_1.EventEmitter();
        this.apiUrl = environment_1.environment.socketApiUrl;
        this.prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;
        this.socket = io.connect(environment_1.environment.socketApiUrl + '/chat');
        this.socket.on('connectedUser', (user) => {
            if (this.authService.userProfile._id === user._id) {
                this.authService.userProfile = user;
            }
        });
    }
    pushUserOnConnection() {
        return this.pushConnectedUser = new rxjs_1.Observable(newUser => {
            this.socket.on('userToPush', (userToPush) => {
                newUser.next(userToPush);
            });
        });
    }
    /**  Initializes a chat between the requester and the recipient */
    initChat(users) {
        const socketIds = users[0].socketId + '&' + users[1].socketId;
        this.socket.emit('joinRoom', socketIds);
    }
    userReconnectionNotifier() {
        return this.userReconnection = new rxjs_1.Observable(userReconnection => {
            this.socket.on('userReconnected', (ur) => {
                userReconnection.next(ur);
            });
        });
    }
    userDisconnectionNotifier() {
        return this.userDisconnection = new rxjs_1.Observable(msg => {
            this.socket.on('userDisconnection', (user) => {
                console.log(user);
                msg.next(user);
            });
        });
    }
    displayConvOnNewMessage() {
        return this.newConversation = new rxjs_1.Observable(newConv => {
            this.socket.on('newConv', (nc) => {
                newConv.next(nc);
            });
        });
    }
    joinNotification() {
        return this.joinNotifier = new rxjs_1.Observable(msg => {
            this.socket.on('createChat', (message) => {
                console.log(message);
                msg.next(message);
            });
        });
    }
    pingConnection(user) {
        this.socket.emit('pingConnection', user);
    }
    getData(directive) {
        return this.dataObservable = new rxjs_1.Observable(message => {
            this.socket.on(directive, (simpleMessage) => message.next(simpleMessage));
        });
    }
    sendMessage(newMessage, chatRequest) {
        this.messageNotifier.emit(newMessage);
        newMessage.chatRequest = chatRequest;
        console.log(newMessage);
        this.socket.emit('simpleMessage', newMessage);
    }
};
ChatService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvc3RhZ21hLWFwcC9zcmMvYXBwL3NlcnZpY2VzL2NoYXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBdUQ7QUFFdkQsK0JBQWdDO0FBRWhDLHFEQUF1QztBQUd2QyxnRUFBMkQ7QUFPM0QsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQWF0QixZQUFvQixVQUFzQixFQUFVLFdBQXdCO1FBQXhELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVJwRSxtQkFBYyxHQUF3QixJQUFJLGlCQUFVLEVBQVcsQ0FBQztRQUNqRSxzQkFBaUIsR0FBc0IsSUFBSSxpQkFBVSxFQUFTLENBQUM7UUFDL0QscUJBQWdCLEdBQXNCLElBQUksaUJBQVUsRUFBUyxDQUFDO1FBQzlELGlCQUFZLEdBQXVCLElBQUksaUJBQVUsRUFBVSxDQUFDO1FBQzVELG9CQUFlLEdBQXNCLElBQUksaUJBQVUsRUFBUyxDQUFDO1FBQzdELHNCQUFpQixHQUFzQixJQUFJLGlCQUFVLEVBQVMsQ0FBQztRQUN0RSxvQkFBZSxHQUFzQixJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQUczRCxJQUFJLENBQUMsTUFBTSxHQUFHLHlCQUFXLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxtQkFBbUIsQ0FBQztRQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMseUJBQVcsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBVyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FB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