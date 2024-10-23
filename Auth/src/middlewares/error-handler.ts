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
  }
  if (err instanceof DatabaseConnectionError) {
  }
  res.status(400).send(err.message);
};
