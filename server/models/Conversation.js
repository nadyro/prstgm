"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChatRequests_1 = require("./ChatRequests");
const Message_1 = require("./Message");
class Conversation {
    constructor() {
        this._id = '';
        this.chatRequestId = '';
        this.chatRequest = new ChatRequests_1.ChatRequests();
        this.message = new Message_1.Message();
        this.startingDate = 0;
        this.lastOpenedDate = 0;
    }
}
exports.Conversation = Conversation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVyc2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbW9kZWxzL0NvbnZlcnNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE0QztBQUM1Qyx1Q0FBa0M7QUFFbEMsTUFBYSxZQUFZO0lBT3ZCO1FBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNGO0FBZkQsb0NBZUMifQ==