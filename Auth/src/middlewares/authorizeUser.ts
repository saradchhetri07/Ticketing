import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }
  } catch (error) {
    next(error);
  }
};
