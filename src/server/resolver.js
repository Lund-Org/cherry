const Middleware = require('../middlewares/Middleware')
const MiddlewareError = require('../middlewares/MiddlewareException')

/**
 * Resolve the route by calling the right method, managing its possible asynchrony
 * @param {Function} callback The controller method to call. Can be async of not
 * @param {Object} req The current request
 * @param {Object} res The object to send response
 * @param {Cherry} cherryInstance The cherry instance
 */
function _resolve (callback, req, res, cherryInstance) {
  let resultOfMethod = callback(req, res, cherryInstance)

  if (Promise.resolve(resultOfMethod) === resultOfMethod) {
    resultOfMethod.then((a) => {
      // Perfect
    }).catch((e) => {
      // @todo use the onError method
      console.log('Error in _resolve', e)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(e))
    })
  }
}

/**
 * Get the right middlewares and link them
 * @param {Function} method The controller method to call. Can be async of not
 * @param {Array} registeredMiddleware All the middlewares registered
 * @param {Array} routeMiddlewares The middleware(s) to check. Can be an Array or a string
 * @param {Cherry} cherryInstance The cherry instance
 * @return {Array}
 */
function _getMiddlewares (method, registeredMiddleware, routeMiddlewares, cherryInstance) {
  let middlewaresInstanceList = []
  // Simulation for the last middleware
  let previousMiddleware = {
    resolve: (req, res) => {
      _resolve(method, req, res, cherryInstance)
    }
  }

  if (Array.isArray(routeMiddlewares)) {
    for (let i = routeMiddlewares.length - 1; i >= 0; --i) {
      let middleware = routeMiddlewares[i]
      if (typeof registeredMiddleware[middleware] !== 'undefined') {
        let MiddlewareInstance = new Middleware(previousMiddleware, registeredMiddleware[middleware])
        middlewaresInstanceList.unshift(MiddlewareInstance)
        previousMiddleware = MiddlewareInstance
      } else {
        throw new MiddlewareError(middleware)
      }
    }
  } else if (typeof routeMiddlewares === 'string') {
    if (typeof registeredMiddleware[routeMiddlewares] !== 'undefined') {
      middlewaresInstanceList.push(new Middleware(previousMiddleware, registeredMiddleware[routeMiddlewares]))
    } else {
      throw new MiddlewareError(routeMiddlewares)
    }
  }

  return middlewaresInstanceList
}

/**
 * Resolve a route by calling the linked method, after processing its possible middlewares
 * @param {Route} route The route informations
 * @param {Dispatcher} dispatcher The dispatcher object
 * @return {Function}
 */
function resolver (route, dispatcher) {
  let method = route.callback

  if (typeof route.middlewares === 'undefined' || route.middlewares.length === 0) {
    return (req, res) => {
      _resolve(method, req, res, dispatcher.cherry)
    }
  } else {
    let middlewares = []

    try {
      middlewares = _getMiddlewares(method, dispatcher.middlewares, route.middlewares, dispatcher.cherry)
    } catch (middlewareException) {
      // @todo : Need to use the onError callback configured
      return (req, res) => {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: middlewareException.message }))
      }
    }

    return (req, res) => {
      middlewares[0].resolve(req, res)
    }
  }
}

module.exports = resolver
