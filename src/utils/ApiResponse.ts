export class ApiResponse {
  public statusCode: number;
  public data: any;
  public message: any;

  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
