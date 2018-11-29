/**
 * The middleware class allows to chain the middleware calls and passing the next one.
 * It's just a wrapper of the existing middlewares in this folder.
 */
class Middleware {
  constructor (next, process) {
    this.next = next
    this.process = process
  }

  /**
   * Call the right method and provide the next middleware (or the endpoint) to call
   * @param {Object} req The current request
   * @param {Object} res The object to send response
   */
  resolve (req, res) {
    this.process(this.next, req, res)
  }
}

module.exports = Middleware
