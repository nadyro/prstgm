import {Users} from './Users';

export class Message {
  _id: string;
  content: string;
  chatRequestId: string;
  chatRequest: Users;
  roomId: string;
  sender: Users;
  receptionDate: Date;
  read: boolean;

  constructor() {
    this._id = '';
    this.content = '';
    this.chatRequest = new Users();
    this.chatRequestId = '';
    this.roomId = '';
    this.receptionDate = new Date();
    this.read = false;
    this.sender = new Users();
  }
}
