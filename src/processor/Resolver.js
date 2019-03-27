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
    let resultOfMethod = callback(request, response, cherryInstance)

    if (Promise.resolve(resultOfMethod) === resultOfMethod) {
      resultOfMethod.then((asyncResult) => {
        cherryInstance.hookConfigurator.trigger(HOOK_AFTER_PROCESS, { request, response, processResult: asyncResult })
        response.addMissingRespond(asyncResult)
      }).catch((e) => {
        // @todo use the onError method
        console.log('Error in _resolve', e)
        response.writeHead(500, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(e))
      })
    } else {
      cherryInstance.hookConfigurator.trigger(HOOK_AFTER_PROCESS, { request, response, processResult: resultOfMethod })
      response.addMissingRespond(resultOfMethod)
    }
  }
}

module.exports = Resolver
