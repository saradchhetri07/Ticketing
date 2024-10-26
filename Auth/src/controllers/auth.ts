import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { Password } from "../services/password";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("user with that email already exists");
    }

    const user = User.build({ email, password });
    const savedUser = await user.save();

    //generate jwt token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };
    res.status(200).send({ savedUser });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("invalid credentials");
    }
    const passwordsMatch = await Password.comparePasssord(
      password,
      existingUser.password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("invalid credentials");
    }
    //generate jwt token
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send({ existingUser });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    res.send({ currentUser: null });
    return;
  }
  try {
    const payload = jwt.verify(req.session!.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
    return;
  } catch (error) {
    res.send({ currentUser: null });
  }
};
