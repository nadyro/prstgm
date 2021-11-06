import {Rooms} from "./Rooms";

export class Users {
  _id: string;
  public email: string;
  public password: string;
  public username: string;
  public isAdmin: number;
  public isAdminBool: number;
  public online: number;
  public socketId: string;

  constructor() {
    this._id = "";
    this.email = "";
    this.password = "";
    this.username = "";
    this.isAdmin = 0;
    this.isAdminBool = 0;
    this.online = 0;
    this.socketId = "";
  }
}
