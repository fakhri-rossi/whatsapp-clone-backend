const ErrorHelper = require("./errorHelper");

const notFound = (req, res, next) => {
  const error = new ErrorHelper(`Not found ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { message, statusCode } = err;

  statusCode = statusCode || 500;
  message = message || "Internal Server Error";

  res.status(statusCode).json({
    message,
    statusCode,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler, notFound };
