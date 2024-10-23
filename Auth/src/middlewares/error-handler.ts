import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../middlewares/request-validation-error";
import { DatabaseConnectionError } from "../middlewares/database-connection-error";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formattedError = err.errors.map((error: any) => {
      return { message: error.msg, field: error.path };
    });
    res.status(400).send({ errors: formattedError });
    return;
  }
  if (err instanceof DatabaseConnectionError) {
    res.status(400).send({ errors: [{ message: err.reason }] });
  }
  res.status(400).send(err.message);
};
