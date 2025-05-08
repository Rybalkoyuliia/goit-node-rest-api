import HttpError from "../helpers/HttpError.js";

export const isBodyEmpty = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "You can't send empty object");
  }
  next();
};
