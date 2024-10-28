import express from "express";
import { getCurrentUser } from "../controllers/auth";
import { currentUser } from "../middlewares/current-user";
import { authorizeUser } from "../middlewares/authorizeUser";

const router = express.Router();

router.get(
  "/api/users/currentUser",
  currentUser,
  authorizeUser,
  getCurrentUser
);

export { router as currentUserRouter };
