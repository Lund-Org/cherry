const resolver = require('./resolver')
const querystring = require('querystring')

/**
 * Get the body of the request and build it to use it with a friendly way
 * @param {Object} request The current request
 * @return {Promise} The body data of the request
 */
async function buildBodyDataAsync (request) {
  return new Promise((resolve, reject) => {
    let chunks = []
    request.on('data', function (data) {
      chunks.push(data)
    })
    request.on('end', function () {
      request.bodyBuffer = Buffer.concat(chunks)
      const body = request.bodyBuffer.toString()
      const post = querystring.parse(body)
      request.body = body
      request.params = post
      resolve(request)
    })
    request.on('error', function (err) {
      reject(err)
    })
  })
}

class Dispatcher {
  /**
   * The dispatcher is the tool which will match the incoming request with the registered routes
   */
  constructor () {
    this.routes = []
    this.middlewares = {}
    this.errorListener = () => { throw new Error('You didn\'t set an errorListener in the dispatcher') }
  }

  /**
   * Allows to add route in the list of available routes
   * @param {Object} route A route to add. It must have at least the keys : path, callback, method
   */
  addRoute (route) {
    this.routes.push(route)
  }

  /**
   * Allows to add a middleware in the list of available middlewares
   * @param {Middleware} middleware A middleware to add
   */
  addMiddleware (middlewareData) {
    this.middlewares[middlewareData.name] = middlewareData.callback
  }

  /**
   * Set the error callback if something goes wrong
   * @param {Object} request The current request
   * @param {Object} response The response object
   */
  dispatch (request, response) {
    const method = request.method.toUpperCase()
    let routeFound = null
    let url = require('url').parse(request.url, true).pathname
    if (!url.endsWith('/')) {
      url += '/'
    }

    this.routes.some((route) => {
      if (route.matchMethod(method)) {
        const match = route.matchRoute(url)

        if (match) {
          request.routeParameters = match
          routeFound = route
          return true
        }
      }
      return false
    })

    if (routeFound) {
      buildBodyDataAsync(request).then((requestWithBody) => {
        resolver(routeFound, this)(
          Object.assign(
            {},
            { _route: Object.freeze(routeFound.clone()) },
            requestWithBody
          ),
          response
        )
      }).catch((e) => {
        this.errorListener(request, response)
      })
    } else {
      console.log('No route found')
      this.errorListener(request, response)
    }
  }

  /**
   * Set the error callback if something goes wrong
   * @param {Function} callback The error method
   */
  onError (callback) {
    this.errorListener = callback
  }
}

module.exports = Dispatcher
