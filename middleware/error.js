const ErrorResponse = require("../utils/errorResponse");

exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for debugging purposes.
  console.log(err.stack.red);

  // Detect mongoose bad object ID.
  if (err.name === "CastError") {
    const message = `Data not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server error" });
};
