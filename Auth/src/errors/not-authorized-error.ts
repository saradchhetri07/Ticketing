import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Not Authorized");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeError() {
    return [
      {
        message: "Not Authorized",
      },
    ];
  }
}
