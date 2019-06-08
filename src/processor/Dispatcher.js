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

    if (this.checkRedirections(routeUrl, request, response)) {
      return
    }

    const matchingRouteResponse = this.cherry.routeConfigurator.searchMatchingRoute(
      routeUrl,
      request,
      response
    )

    if (matchingRouteResponse) {
      if (!matchingRouteResponse.shouldStop()) {
        this.executeRoute(matchingRouteResponse, request, response)
      }
    } else {
      this.cherry.defaultErrorPageConfigurator.manager.clientErrorPage(request, response)
    }
  }

  /**
   * Check if there is a matching redirection and execute it if there is one found
   * @param {string} routePath The path of the current route
   * @param {CherryIncomingMessage} request The current request
   * @param {CherryServerResponse} response The current response
   * @return {boolean} If a redirection is done or not
   */
  checkRedirections (routePath, request, response) {
    const matchingRedirection = this.cherry.redirectionConfigurator
      .searchMatchingRedirection(
        routePath,
        request,
        response
      )

    if (matchingRedirection) {
      matchingRedirection.execute(routePath, request, response)
      return true
    }

    return false
  }

  /**
   * Execute the request to the route found previously
   * @param {RouteMatchResponse} matchingRouteResponse The matching route found
   * @param {CherryIncomingMessage} request The current request
   * @param {CherryServerResponse} response The current response
   */
  executeRoute (matchingRouteResponse, request, response) {
    request.routeParameters = matchingRouteResponse.getAttributes()
    request.boundDataToRequest().then(() => {
      request._route = matchingRouteResponse.getMatchingRoute()
      this.resolver.resolve(request, response)
    }).catch((err) => {
      this.cherry.defaultErrorPageConfigurator.manager.serverErrorPage(request, response, err)
    })
  }
}

module.exports = Dispatcher
