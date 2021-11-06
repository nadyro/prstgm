import {Credentials} from "./Credentials";
import {Users} from "./Users";

export class AuthResults {
  success: boolean;
  object: Users;
  credentials: Credentials;
  message: string;

  constructor() {
    this.success = false;
    this.object = new Users();
    this.credentials = new Credentials();
    this.message = '';
  }
}
