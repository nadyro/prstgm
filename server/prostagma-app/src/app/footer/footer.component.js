"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let FooterComponent = class FooterComponent {
    constructor(chatRequestsService, chatService, common) {
        this.chatRequestsService = chatRequestsService;
        this.chatService = chatService;
        this.common = common;
        this.chatRequests = new Array();
    }
    closedChatRequest(chatRequest) {
        this.chatRequests = this.common.checkIfExists(this.chatRequests, chatRequest, true);
    }
    ngOnInit() {
        this.chatService.displayConvOnNewMessage().subscribe((nc) => {
            this.chatRequests = this.common.checkIfExists(this.chatRequests, nc, false);
        });
        this.chatRequestsService.chatEmitter.subscribe((user) => {
            this.chatRequests = this.common.checkIfExists(this.chatRequests, user, false);
        });
    }
};
FooterComponent = __decorate([
    core_1.Component({
        selector: 'app-footer',
        templateUrl: './footer.component.html',
        styleUrls: ['./footer.component.scss']
    })
], FooterComponent);
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb3N0YWdtYS1hcHAvc3JjL2FwcC9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUE4RDtBQVk5RCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBSTFCLFlBQW9CLG1CQUF3QyxFQUFVLFdBQXdCLEVBQVMsTUFBYztRQUFqRyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRnJILGlCQUFZLEdBQVksSUFBSSxLQUFLLEVBQVMsQ0FBQztJQUczQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsV0FBa0I7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFTLEVBQUUsRUFBRTtZQUNqRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFXLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUVGLENBQUE7QUFuQlksZUFBZTtJQUwzQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFlBQVk7UUFDdEIsV0FBVyxFQUFFLHlCQUF5QjtRQUN0QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztLQUN2QyxDQUFDO0dBQ1csZUFBZSxDQW1CM0I7QUFuQlksMENBQWUifQ==