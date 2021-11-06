export class Games {
  _id: string;
  title: string;
  categoryName: string;
  editor: string;
  releaseDate: Date;
  developer: string;
  picture: string;

  constructor() {
    this._id = '';
    this.title = '';
    this.categoryName = '';
    this.editor = '';
    this.releaseDate = new Date();
    this.developer = '';
    this.picture = '';
  }
}
