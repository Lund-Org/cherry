const CherryConfigurator = require('../abstract/CherryConfigurator')
const MiddlewareManager = require('../middlewares/MiddlewareManager')
const MiddlewareWrapper = require('../middlewares/MiddlewareWrapper')
const check = require('../helpers/check')

class MiddlewareConfigurator extends CherryConfigurator {
  constructor () {
    super(new MiddlewareManager())
  }

  /**
   * Configure multiple middlewares and bind this to the event emitter
   * @param {Object} options The options set to the cherry instance
   */
  configure (options) {
    if (check.isDefined(options, 'allowDuplicatedMiddlewares')) {
      this.manager.setDuplicateHookOption(!!options.allowDuplicatedMiddlewares)
    }
    super.configure(options, 'middlewares', 'addMiddleware', 'Array')
  }

  /**
   * Builds a chain of middleware and returns it
   * @param {Array<string>} middlewaresInvoked The list of middleware to chain
   * @param {Function} routeAction The method to execute
   */
  buildMiddlewareChain (middlewaresInvoked, routeAction) {
    const reverseMiddlewaresInvoked = [...middlewaresInvoked].reverse()
    let currentMiddleware = null
    let lastMiddleware = routeAction

    reverseMiddlewaresInvoked.forEach((middlewareName) => {
      const _middleware = this.manager.getMiddlewareByName(middlewareName)

      currentMiddleware = new MiddlewareWrapper(_middleware)
      currentMiddleware.setNextAction(lastMiddleware)
      lastMiddleware = currentMiddleware
    })

    return currentMiddleware
  }
}

module.exports = MiddlewareConfigurator
