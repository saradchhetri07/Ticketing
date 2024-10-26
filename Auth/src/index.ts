import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { ErrorHandler } from "./middlewares/error-handler";
import cookieSession from "cookie-session";
import mongoose from "mongoose";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(signOutRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(currentUserRouter);

app.use(ErrorHandler);

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT key must be defined");
    }
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
