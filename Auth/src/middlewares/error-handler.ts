import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`came inside error handler`);

  if (err instanceof CustomError) {
    console.log(`came to custom error handler ${err.message}`);

    res.status(err.statusCode).send({ errors: err.serializeError() });
    return;
  }

  res.status(400).send(err.message);
};
