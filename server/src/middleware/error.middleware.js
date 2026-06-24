const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  return res.status(err.statusCode || statusCode).json({
    success: false,
    message: err.response?.message || message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    errors,
  });
};

export default errorMiddleware;
