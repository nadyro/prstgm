"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Message_1 = require("../../../../models/Message");
const Users_1 = require("../../../../models/Users");
const environment_1 = require("../../environments/environment");
let ChatRequestsComponent = class ChatRequestsComponent {
    constructor(chatService, authService) {
        this.chatService = chatService;
        this.authService = authService;
        this.chatRequest = new Users_1.Users();
        this.closedChatRequest = new core_1.EventEmitter();
        this.displayed = false;
        this.initialClass = 'tab';
        this.messageReceived = new Array();
        this.env = environment_1.environment;
        this.loginStatusMessage = '';
    }
    sendSimpleMessage(message, event) {
        const newMessage = new Message_1.Message();
        newMessage.receptionDate = new Date();
        newMessage.chatRequestId = this.chatRequest._id;
        newMessage.read = false;
        // newMessage.roomId = this.chatRequest.roomId;
        newMessage.sender = this.authService.userProfile;
        if (event) {
            console.log(message);
            newMessage.content = message.previousSibling.value;
            this.chatService.sendMessage(newMessage, this.chatRequest);
            message.previousSibling.value = '';
        }
        else {
            newMessage.content = message.value;
            this.chatService.sendMessage(newMessage, this.chatRequest);
            message.value = '';
        }
        // this.messages.push(newMessage);
    }
    displayChatRequest(chatRequest, htmlElement) {
        if (this.displayed === false) {
            htmlElement.className += ' extendedTab';
            htmlElement.nextSibling.style.display = 'block';
            this.displayed = true;
        }
        else {
            htmlElement.className = this.initialClass;
            htmlElement.nextSibling.style.display = 'none';
            this.displayed = false;
        }
    }
    closeChatRequest(chatRequest) {
        this.closedChatRequest.emit(chatRequest);
    }
    ngOnInit() {
        this.chatService.userReconnectionNotifier().subscribe(user => {
            this.loginStatusMessage = user.username + ' has reconnected.';
            this.chatRequest = user;
        });
        this.chatService.userDisconnectionNotifier().subscribe(user => {
            this.loginStatusMessage = user.username + ' has disconnected.';
        });
        this.chatService.getData('msgReceived').subscribe(message => {
            if (message.sender._id === this.chatRequest._id) {
                this.messageReceived.push(message);
                console.log('New message received.');
                console.log(message);
            }
        });
    }
};
__decorate([
    core_1.Input()
], ChatRequestsComponent.prototype, "chatRequest", void 0);
__decorate([
    core_1.Output()
], ChatRequestsComponent.prototype, "closedChatRequest", void 0);
ChatRequestsComponent = __decorate([
    core_1.Component({
        selector: 'app-chat-requests',
        templateUrl: './chat-requests.component.html',
        styleUrls: ['./chat-requests.component.scss']
    })
], ChatRequestsComponent);
exports.ChatRequestsComponent = ChatRequestsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yZXF1ZXN0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9zdGFnbWEtYXBwL3NyYy9hcHAvY2hhdC1yZXF1ZXN0cy9jaGF0LXJlcXVlc3RzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUE2RTtBQUs3RSx3REFBbUQ7QUFDbkQsb0RBQStDO0FBQy9DLGdFQUEyRDtBQU8zRCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQVNoQyxZQUFvQixXQUF3QixFQUFVLFdBQXdCO1FBQTFELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFQckUsZ0JBQVcsR0FBVSxJQUFJLGFBQUssRUFBRSxDQUFDO1FBQ3pCLHNCQUFpQixHQUF3QixJQUFJLG1CQUFZLEVBQVMsQ0FBQztRQUM1RSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLG9CQUFlLEdBQWMsSUFBSSxLQUFLLEVBQVcsQ0FBQztRQUNsRCxRQUFHLEdBQUcseUJBQVcsQ0FBQztRQUN6Qix1QkFBa0IsR0FBRyxFQUFFLENBQUM7SUFHeEIsQ0FBQztJQUVELGlCQUFpQixDQUFDLE9BQVksRUFBRSxLQUFVO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQ2pDLFVBQVUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QyxVQUFVLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQ2hELFVBQVUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLCtDQUErQztRQUMvQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ2pELElBQUksS0FBSyxFQUFFO1lBQ1QsT0FB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