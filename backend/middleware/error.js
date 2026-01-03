import HandleError from "../helper/handleError.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Duplicate key error
  if (err.code == 11000) {
    //console.log(Object.keys(err.keyValue))
    const message = `This ${Object.keys(err.keyValue)} is already registered`;
    err = new HandleError(message, 400);
    err.statusCode = 400;
    err.message = message;
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
