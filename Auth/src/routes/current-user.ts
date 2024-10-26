import express from "express";
import { getCurrentUser } from "../controllers/auth";
const router = express.Router();

router.get("/api/users/currentUser", getCurrentUser);

export { router as currentUserRouter };
