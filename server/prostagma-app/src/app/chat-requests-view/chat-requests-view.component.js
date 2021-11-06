"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const drag_drop_1 = require("@angular/cdk/drag-drop");
const cardLinks = [
    [1, 3, 4],
    [0, 2, 3, 4, 5],
    [1, 4, 5],
    [0, 1, 4, 6, 7],
    [0, 1, 2, 3, 5, 6, 7, 8],
    [1, 2, 4, 7, 8],
    [3, 4, 7],
    [3, 4, 5, 6, 8],
    [4, 5, 7]
];
let ChatRequestsViewComponent = class ChatRequestsViewComponent {
    constructor(chatService, notificationService, authService, chatRequestService, usersService, common) {
        this.chatService = chatService;
        this.notificationService = notificationService;
        this.authService = authService;
        this.chatRequestService = chatRequestService;
        this.usersService = usersService;
        this.common = common;
        this.chatRequests = new Array();
        this.chatRequested = new Array();
        this.teamChatRequests = new Array();
        this.archivedChatRequests = new Array();
        this.selectedChatRequest = new Array();
        this.users = new Array();
        this.usersTmp = new Array();
        this.selectedChat = new core_1.EventEmitter();
        this.resized = new core_1.EventEmitter();
        this.count = 9;
        this.array = [];
        this.usersService.getUsersExceptCurrent().subscribe(u => {
            this.users = u;
        });
    }
    ngOnInit() {
        this.chatService.userDisconnectionNotifier().subscribe(user => {
            this.usersTmp = this.common.checkIfExists(this.users, user, true);
            this.users = [...this.usersTmp];
        });
        this.chatService.pushUserOnConnection().subscribe(newUser => {
            this.usersTmp = this.common.checkIfExists(this.users, newUser, false);
            this.users = [...this.usersTmp];
        });
        this.notificationService.getChatRequestNotifications().subscribe(cr => {
            cr.forEach(chat => {
                this.chatRequests.push(chat);
            });
        });
    }
    startChatRequest(user) {
        const chatRequestUsers = [this.authService.userProfile, user];
        this.chatService.initChat(chatRequestUsers);
        this.chatRequestService.startChatRequest(user);
    }
    drop(event) {
        if (event.previousContainer === event.container) {
            drag_drop_1.moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            drag_drop_1.transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }
};
__decorate([
    core_1.Output()
], ChatRequestsViewComponent.prototype, "selectedChat", void 0);
__decorate([
    core_1.Output()
], ChatRequestsViewComponent.prototype, "resized", void 0);
ChatRequestsViewComponent = __decorate([
    core_1.Component({
        selector: 'app-chat-requests-view',
        templateUrl: './chat-requests-view.component.html',
        styleUrls: ['./chat-requests-view.component.scss']
    })
], ChatRequestsViewComponent);
exports.ChatRequestsViewComponent = ChatRequestsViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yZXF1ZXN0cy12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb3N0YWdtYS1hcHAvc3JjL2FwcC9jaGF0LXJlcXVlc3RzLXZpZXcvY2hhdC1yZXF1ZXN0cy12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUE2RTtBQUk3RSxzREFBdUY7QUFTdkYsTUFBTSxTQUFTLEdBQUc7SUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNmLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDVixDQUFDO0FBUUYsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFZcEMsWUFBb0IsV0FBd0IsRUFDeEIsbUJBQXlDLEVBQ3pDLFdBQXdCLEVBQ3hCLGtCQUF1QyxFQUN2QyxZQUEwQixFQUMxQixNQUFjO1FBTGQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JB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