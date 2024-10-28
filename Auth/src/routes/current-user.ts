import express from "express";
import { getCurrentUser } from "../controllers/auth";
import { currentUser } from "../middlewares/current-user";
const router = express.Router();

router.get("/api/users/currentUser", currentUser, getCurrentUser);

export { router as currentUserRouter };
