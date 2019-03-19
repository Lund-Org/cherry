const { HOOK_BEFORE_PROCESS, HOOK_AFTER_PROCESS } = require('../hooks/constants')

function _addMissingRespond (res, resultValue) {
  if (!res.finished) {
    if (typeof resultValue === 'object') {
      res.json(resultValue)
    } else if (typeof resultValue === 'string') {
      res.end(resultValue)
    } else {
      res.end(resultValue.toString())
    }
  }
}

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
    resultOfMethod.then((asyncResult) => {
      cherryInstance.hookConfigurator.trigger(HOOK_AFTER_PROCESS, { req, res, processResult: asyncResult })
      _addMissingRespond(res, asyncResult)
    }).catch((e) => {
      // @todo use the onError method
      console.log('Error in _resolve', e)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(e))
    })
  } else {
    cherryInstance.hookConfigurator.trigger(HOOK_AFTER_PROCESS, { req, res, processResult: resultOfMethod })
    _addMissingRespond(res, resultOfMethod)
  }
}

/**
 * Resolve a route by calling the linked method, after processing its possible middlewares
 * @param {Route} route The route informations
 * @param {Dispatcher} dispatcher The dispatcher object
 * @return {Function}
 */
function resolver (route, dispatcher) {
  let method = (req, res) => {
    return _resolve(route.callback, req, res, dispatcher.cherry)
  }

  if (typeof route.middlewares === 'undefined' || route.middlewares.length === 0) {
    return (req, res) => {
      dispatcher.cherry.hookConfigurator.trigger(HOOK_BEFORE_PROCESS, { req, res, middlewares: [] })
      return method(req, res)
    }
  } else {
    const middlewareChain = dispatcher.cherry.middlewareConfigurator.buildMiddlewareChain(route.middlewares, { resolve: method })

    return (req, res) => {
      dispatcher.cherry.hookConfigurator.trigger(HOOK_BEFORE_PROCESS, { req, res, middlewareChain })
      middlewareChain.resolve(req, res)
    }
  }
}

module.exports = resolver
