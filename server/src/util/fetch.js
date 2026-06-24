export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const sendResponse = (
  res,
  {
    statusCode = 200,
    message = "Request successful",
    success = true,
    data = null,
  }
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
