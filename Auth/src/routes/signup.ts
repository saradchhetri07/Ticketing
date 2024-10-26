import { Password } from "./../services/password";
import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { signUp as signUpController } from "../controllers/auth";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signUp",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  signUpController
);

export { router as signUpRouter };
