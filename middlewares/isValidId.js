import { isValidObjectId } from "mongoose";

import HttpError from "../helpers/HttpError.js";

const isValid = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} isn't valid`));
  }
  next();
};

export default isValid;
