import httpContext from 'express-http-context'

/**
 * Middleware to make base URL available in the request context and views.
 *
 * @param {string} baseURL - The base URL to set.
 * @returns {Function} - A middleware function that sets the base URL in the request context and response locals.
 */
export const setBaseURL = (baseURL) => {
  return (req, res, next) => {
    httpContext.set('baseURL', baseURL)
    res.locals.baseURL = baseURL
    next()
  }
}
