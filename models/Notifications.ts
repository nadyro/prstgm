export class Notifications {
  _id: string;
  public requesterId: string;
  public recipientId: string;
  public dateEmitted: Date;
  public objectId: string;
  public objectName: string;
  public seen: boolean;

  constructor() {
    this._id = '';
    this.requesterId = '';
    this.recipientId = '';
    this.dateEmitted = new Date();
    this.objectId = '';
    this.objectName = '';
    this.seen = false;
  }

}
