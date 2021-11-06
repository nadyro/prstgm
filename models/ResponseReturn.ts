export class ResponseReturn {
  successList: any[];
  errorList: any[];
  status: number;
  message?: string;

  constructor() {
    this.successList = [];
    this.errorList = [];
    this.status = 0;
    this.message = '';
  }
}
