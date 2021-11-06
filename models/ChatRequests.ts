import {Users} from "./Users";

export class ChatRequests {
  _id: string;
  recipientSocketId: string;
  requesterSocketId: string;
  roomId: string;
  requester: Users;
  recipient: Users;
  creationDate: Number;
  fulfilled: boolean;

  constructor() {
    this._id = '';
    this.recipientSocketId = '';
    this.requesterSocketId = '';
    this.roomId = '';
    this.requester = new Users();
    this.recipient = new Users();
    this.creationDate = Date.now();
    this.fulfilled = false;
  }

}
