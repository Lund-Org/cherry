const check = require('../helpers/check')
const MiddlewareBadConfigurationException = require('./MiddlewareBadConfigurationException')

/**
 * The registered middlewares which will be used in the MiddlewareWrapper
 */
class Middleware {
  constructor (middlewareOptions) {
    if (!check.isDefined(middlewareOptions, 'name')) {
      throw new MiddlewareBadConfigurationException(undefined)
    } else {
      this.name = middlewareOptions.name
    }

    if (!check.isDefined(middlewareOptions, 'callback') || typeof middlewareOptions['callback'] !== 'function') {
      throw new MiddlewareBadConfigurationException(this.name, 'callback', 'function')
    }
    this.process = middlewareOptions.callback
  }

  /**
   * Retrieves the name of the middleware
   */
  getName () {
    return this.name
  }

  /**
   * Call the right method and provide the next middleware (or the endpoint) to call
   * @param {Function} next The next action to do
   * @param {CherryIncomingMessage} req The current request
   * @param {CherryServerResponse} res The object to send response
   */
  resolve (next, req, res) {
    this.process(next, req, res)
  }
}

module.exports = Middleware
