const Resolver = require('./Resolver')
const querystring = require('querystring')
const url = require('url')

/**
 * The class which will find the right route and resolve it
 */
class Dispatcher {
  /**
   * The constructor of the dispatcher
   * @param {Cherry} cherryInstance The current cherry instance
   */
  constructor (cherryInstance) {
    this.cherry = cherryInstance
    this.resolver = new Resolver()
  }

  /**
   * Get the right route and resolves it
   * @param {CherryIncomingMessage} request The current request
   * @param {CherryServerResponse} response The response object
   */
  dispatch (request, response) {
    const parsedUrlObject = url.parse(request.url, true)
    const routeUrl = parsedUrlObject.pathname
    const matchingRouteResponse = this.cherry.routeConfigurator.searchMatchingRoute(
      routeUrl,
      request,
      response
    )

    if (matchingRouteResponse) {
      if (!matchingRouteResponse.shouldStop()) {
        request.routeParameters = matchingRouteResponse.getAttributes()
        this.boundDataToRequest(request, parsedUrlObject).then(() => {
          request._route = matchingRouteResponse.getMatchingRoute()
          this.resolver.resolve(request, response)
        }).catch((err) => {
          // @todo : manage error
          console.log(err)
          response.writeHead(500)
          response.end('')
        })
      }
    } else {
      response.writeHead(404)
      response.end('')
    }
  }

  /**
   * Get the body of the request and build it to use it with a friendly way
   * @param {CherryIncomingMessage} request The current request
   * @param {Object} parsedUrl The url object of the parsed url
   * @return {Promise} The body data of the request
   */
  async boundDataToRequest (request, parsedUrl) {
    return new Promise((resolve, reject) => {
      const chunks = []

      request.on('data', function (data) {
        chunks.push(data)
      })
      request.on('end', function () {
        request.bodyBuffer = Buffer.concat(chunks)
        request.body = request.bodyBuffer.toString()
        let post = {}

        try {
          post = JSON.parse(request.body)
        } catch (e) {
          post = querystring.parse(request.body)
        }
        request.params = { ...parsedUrl.querystring, ...post }
        resolve(request)
      })
      request.on('error', function (err) {
        reject(err)
      })
    })
  }
}

module.exports = Dispatcher
