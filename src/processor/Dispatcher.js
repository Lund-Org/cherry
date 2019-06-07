const Resolver = require('./Resolver')
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
        request.boundDataToRequest().then(() => {
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
}

module.exports = Dispatcher
