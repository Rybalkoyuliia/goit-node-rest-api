import Joi from "joi";
import emailPattern from "../constants/constants.js";

export const userSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().min(6).required(),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().min(6).required(),
});
