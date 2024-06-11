export class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public data: any;
  public errors: any;

  constructor (
    statusCode: number,
    message: string,
    errors = [],
    stack = '',
  ){
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}