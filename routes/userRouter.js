import express from "express";
import authControllers from "../controllers/authControllers.js";

import { userSignInSchema, userSignUpSchema } from "../schema/authSchemas.js";

import isBodyEmpty from "../middlewares/isBodyEmpty.js";

import validateBody from "../helpers/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  isBodyEmpty,
  validateBody(userSignUpSchema),
  authControllers.signup
);

userRouter.post(
  "/login",
  isBodyEmpty,
  validateBody(userSignInSchema),
  authControllers.signin
);

userRouter.get("/current", authenticate, authControllers.getCurrent);

userRouter.post("/logout", authenticate, authControllers.logout);

export default userRouter;
