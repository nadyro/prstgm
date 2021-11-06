import {Users} from "./Users";
import {ChatRequests} from "./ChatRequests";

export class Rooms {
  _id: string;
  roomId: string;
  userIds: string;
  users: Users[];
  creationDate: Number;
  lastOpenedDate: Number;

  constructor() {
    this._id = '';
    this.roomId = '';
    this.userIds = '';
    this.users = new Array<Users>();
    this.creationDate = 0;
    this.lastOpenedDate = 0;
  }
}
