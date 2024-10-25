import express from "express";
import { body } from "express-validator";
import { signIn as signInController } from "../controllers/auth";

const router = express.Router();

router.get(
  "/api/users/signIn",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be entered"),
  ],
  signInController
);

export { router as signInRouter };
