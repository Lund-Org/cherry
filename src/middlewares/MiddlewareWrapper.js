/**
 * The MiddlewareWrapper class allows to chain the middleware calls and passing the next one.
 * It's just a wrapper of the existing middlewares in this folder.
 */
class MiddlewareWrapper {
  constructor (middleware) {
    this.next = null
    this.middleware = middleware
  }

  /**
   * Assign the next callback to chain the middlewares
   * @param {Middleware|Function} next Set the next operation to do
   */
  setNextAction (next) {
    this.next = next
  }

  /**
   * Call the right method and provide the next middleware (or the endpoint) to call
   * @param {Object} req The current request
   * @param {Object} res The object to send response
   */
  resolve (req, res) {
    this.middleware.resolve(this.next, req, res)
  }
}

module.exports = MiddlewareWrapper
