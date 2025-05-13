import User from "../models/User.js";

import bcrypt from "bcrypt";

export const findUser = async (filter) => await User.findOne(filter);

export const signup = async (data) => {
  const { password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ ...data, password: hashedPassword });
};

export const comparePassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
