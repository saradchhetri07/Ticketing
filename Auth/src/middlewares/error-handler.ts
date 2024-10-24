import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeError() });
    return;
  }

  res.status(400).send(err.message);
};
