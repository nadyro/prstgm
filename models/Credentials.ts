export class Credentials {
  expiresIn: number;
  accessToken: string;

  constructor() {
    this.expiresIn = 0;
    this.accessToken = '';
  }
}
