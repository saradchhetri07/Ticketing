import express from "express";
import { body } from "express-validator";
import { signIn as signInController } from "../controllers/auth";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signIn",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be entered"),
  ],
  validateRequest,
  signInController
);
router.get("/api/users/test", (req, res) => {
  res.send("hello ");
});

export { router as signInRouter };
