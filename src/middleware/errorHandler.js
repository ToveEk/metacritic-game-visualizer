/**
 * Handles errors.
 *
 * @param {object} error - The error object.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware.
 * @returns {object} - The response object.
 */
export const errorHandler = (error, req, res, next) => {
  console.error(error)

  const statusCode = error.statusCode || 500
  const response = {
    status: statusCode,
    message: error.message || 'An unexpected error occurred.'
  }

  if (process.env.NODE_ENV !== 'production') {
    response.stack = error.stack
    response.details = error
  }

  return res.status(statusCode).json(response)
}
