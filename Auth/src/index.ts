import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { ErrorHandler } from "./middlewares/error-handler";

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
app.listen(3000, () => {
  console.log(`listening in port 300!!!`);
});
