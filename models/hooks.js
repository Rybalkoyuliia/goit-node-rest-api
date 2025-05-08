export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next(error);
};

export const setUpdSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
