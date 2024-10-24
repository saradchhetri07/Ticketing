import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { ErrorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";

const app = express();
app.use(json());

app.use(currentUserRouter);

app.use(signOutRouter);
app.use(signUpRouter);
app.use(signInRouter);

app.use(ErrorHandler);
app.get("/api/users/currentUser", (req, res) => {
  res.send("Hi there!");
});

const start = async () => {
  try {
    const mongoUrl = "mongodb://auth-mongo-srv:27017/auth";
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log(`listening in port 300!!!`);
  });
};
start();
