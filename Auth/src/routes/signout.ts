import express from "express";

const router = express.Router();

router.get("/api/users/signOut", (req, res) => {
  res.send("sign out router");
});

export { router as signOutRouter };
