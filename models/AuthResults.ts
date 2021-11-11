import {Credentials} from "./Credentials";
import {Users} from "./Users";

export class AuthResults {
  success: boolean;
  object: Users | null;
  credentials: Credentials | null;
  message: string;

  constructor() {
    this.success = false;
    this.object = new Users();
    this.credentials = new Credentials();
    this.message = '';
  }
}
