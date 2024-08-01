// middleware of error type = (error, req, res, next)
function logErrors(error, req, res, next) {
  console.log("logErrors");
  // For now we're going to display the error in the console, afterwards we could add tracking systems.
  console.error(error)

  next(error)
}

// Even if you don't use next, you have to add it to inform it's a middleware.
// This is used to create a standard for throwing errors to client.
function errorHandler(error, req, res, next) {
  console.log("errorHandler");
  // We should avoid error 500, cause there's a status code for every error (404, 400, etc.).
  res.status(500).json({
    message: error.message,
    stack: error.stack
  })
}

module.exports = { logErrors, errorHandler }
