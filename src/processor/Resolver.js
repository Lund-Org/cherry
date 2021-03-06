const { HOOK_BEFORE_PROCESS, HOOK_AFTER_PROCESS } = require('../hooks/constants')

/**
 * The class will resolve the route found
 */
class Resolver {
  /**
   * Resolve a route by calling the configured callback, with the middleware chain and manages the response
   * @param {CherryIncomingMessage} request The current request
   * @param {CherryServerResponse} response The response object
   */
  resolve (request, response) {
    const cherry = request.getCherry()
    const route = request._route

    if (typeof route.middlewares === 'undefined' || route.middlewares.length === 0) {
      cherry.hookConfigurator.trigger(HOOK_BEFORE_PROCESS, { request, response, middlewares: [] })
      return this._process(route.callback, request, response, cherry)
    } else {
      const middlewareChain = cherry.middlewareConfigurator.buildMiddlewareChain(
        route.middlewares,
        {
          resolve: (req, res) => {
            return this._process(route.callback, req, res, cherry)
          }
        }
      )

      cherry.hookConfigurator.trigger(HOOK_BEFORE_PROCESS, { request, response, middlewares: middlewareChain })
      return middlewareChain.resolve(request, response)
    }
  }

  /**
   * Execute the callback of the route and provide a response if none has been set
   * @param {CherryIncomingMessage} request The current request
   * @param {CherryServerResponse} response The response object
   */
  _process (callback, request, response, cherryInstance) {
    const resultOfMethod = callback(request, response, cherryInstance)

    if (Promise.resolve(resultOfMethod) === resultOfMethod) {
      resultOfMethod.then((asyncResult) => {
        this._addMissingResponse(
          cherryInstance,
          { request, response, processResult: asyncResult },
          asyncResult
        )
      }).catch((error) => {
        if (!response.finished) {
          cherryInstance.defaultErrorPageConfigurator.manager.serverErrorPage(request, response, error)
        }
      })
    } else {
      this._addMissingResponse(
        cherryInstance,
        { request, response, processResult: resultOfMethod },
        resultOfMethod
      )
    }
  }

  /**
   * Add a response when it's missing
   * @param {Cherry} cherryInstance The cherry Instance
   * @param {Object} hookData The data sent by the AFTER PROCESS HOOK
   * @param {mixed} result The result of the callback method
   */
  _addMissingResponse (cherryInstance, hookData, result) {
    cherryInstance.hookConfigurator.trigger(HOOK_AFTER_PROCESS, hookData)
    hookData.response.addMissingResponse(result)
  }
}

module.exports = Resolver
