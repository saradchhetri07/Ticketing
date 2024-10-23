import express from "express";

const router = express.Router();

router.get("/api/users/signIn", (req,res) => {
    res.send("sign in router");
});

export { router as signInRouter };
