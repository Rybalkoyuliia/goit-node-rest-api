import HttpError from "../helpers/HttpError.js";

export const isBodyEmpty = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    next(HttpError(400, "You can't send empty object"));
  }
  next();
};
