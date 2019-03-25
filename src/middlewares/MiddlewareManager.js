const Middleware = require('./Middleware')
const DuplicateMiddlewareException = require('./DuplicateMiddlewareException')
const MiddlewareNotFoundException = require('./MiddlewareNotFoundException')
const check = require('../helpers/check')

class MiddlewareManager {
  constructor () {
    this.middlewares = {}
    this.allowDuplicatedMiddlewares = false
  }

  /**
   * Set the option which allows or not the duplication
   * If true, it only warns
   * If false, it throws
   * @param {boolean} value The option value
   */
  setDuplicateMiddlewareOption (value) {
    this.allowDuplicatedMiddlewares = value
  }

  /**
   * Add a middleware to the list of middleware
   */
  addMiddleware (newMiddleware) {
    let _middleware = newMiddleware
    if (!(newMiddleware instanceof Middleware)) {
      _middleware = new Middleware(newMiddleware)
    }
    if (!check.isDefined(this.middlewares, _middleware.getName())) {
      this.middlewares[_middleware.getName()] = _middleware
    } else {
      this._manageDuplicateMiddleware(this.middlewares[_middleware.getName()])
    }
  }

  /**
   * Get the middleware by its name from the list of the registered middlewares
   */
  getMiddlewareByName (middlewareName) {
    if (!check.isDefined(this.middlewares, middlewareName)) {
      throw new MiddlewareNotFoundException(middlewareName)
    }

    return this.middlewares[middlewareName]
  }

  /**
   * Warn or throw an exception because of a duplicate middleware
   * @param {Hook} oldHook The middleware previously registered
   */
  _manageDuplicateMiddleware (oldMiddleware) {
    if (this.allowDuplicatedMiddlewares) {
      console.warn(`The middleware ${oldMiddleware.getName()} has a duplicate middleware (same name). The new Middleware will be ignored`)
    } else {
      throw new DuplicateMiddlewareException(oldMiddleware.getName())
    }
  }
}

module.exports = MiddlewareManager
