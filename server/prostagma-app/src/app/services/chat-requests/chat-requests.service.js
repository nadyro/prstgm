"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ChatRequestsService = class ChatRequestsService {
    constructor(chatService, httpClient) {
        this.chatService = chatService;
        this.httpClient = httpClient;
        this.chatEmitter = new core_1.EventEmitter();
        this.displayChat = new core_1.EventEmitter();
    }
    startChatRequest(user) {
        this.chatEmitter.emit(user);
        // const usersID = chatRequest.recipient._id + ' & ' + chatRequest.requester._id;
        // this.chatService.initChat(usersID);
    }
    displayChatRequest(chatRequest) {
        this.displayChat.emit(chatRequest._id);
    }
};
ChatRequestsService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], ChatRequestsService);
exports.ChatRequestsService = ChatRequestsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yZXF1ZXN0cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvc3RhZ21hLWFwcC9zcmMvYXBwL3NlcnZpY2VzL2NoYXQtcmVxdWVzdHMvY2hhdC1yZXF1ZXN0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXVEO0FBVXZELElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBSzlCLFlBQW9CLFdBQXdCLEVBQVUsVUFBc0I7UUFBeEQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSHJFLGdCQUFXLEdBQXdCLElBQUksbUJBQVksRUFBUyxDQUFDO1FBQ3BFLGdCQUFXLEdBQXNCLElBQUksbUJBQVksRUFBTyxDQUFDO0lBR3pELENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFXO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLGlGQUFpRjtRQUNqRixzQ0FBc0M7SUFDeEMsQ0FBQztJQUVELGtCQUFrQixDQUFDLFdBQXlCO1FBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0YsQ0FBQTtBQWpCWSxtQkFBbUI7SUFIL0IsaUJBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxtQkFBbUIsQ0FpQi9CO0FBakJZLGtEQUFtQiJ9