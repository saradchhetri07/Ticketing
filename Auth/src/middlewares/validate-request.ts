import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(body);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    next();
  } catch (error) {
    next(error);
  }
};
