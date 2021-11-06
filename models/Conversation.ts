import {ChatRequests} from "./ChatRequests";
import {Message} from "./Message";

export class Conversation {
  _id: string;
  chatRequestId: string;
  chatRequest: ChatRequests;
  message: Message;
  startingDate: number;
  lastOpenedDate: number;
  constructor() {
    this._id = '';
    this.chatRequestId = '';
    this.chatRequest = new ChatRequests();
    this.message = new Message();
    this.startingDate = 0;
    this.lastOpenedDate = 0;
  }
}
