const errorHandler = (err, req, res, next) => {
  let { message, statusCode } = err;

  statusCode = statusCode || 500;
  message = message || "Internal Server Error";

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;
