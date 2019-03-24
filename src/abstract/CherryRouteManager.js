const RouteManagerException = require('../routes/exceptions/RouteManagerException')

/**
 * The abstraction of the RouteManager classes
 */
class CherryRouteManager {
  constructor () {
    this.routes = []
  }

  /**
   * The method to register a new route
   */
  registerRoute (routeConfig, routers) {
    let routeTypeMatch = false

    for (const Router of routers) {
      if (Router.getType() === routeConfig.type) {
        let router = new Router(routeConfig)

        this.routes = this.routes.concat(router.build())
        routeTypeMatch = true
      }
    }

    if (!routeTypeMatch) {
      throw new RouteManagerException(routeConfig, 'The \'type\' key is missing.')
    }
  }

  /**
   * Returns the routes registered
   * @return {Array}
   */
  getRoutes () {
    return this.routes
  }
}

module.exports = CherryRouteManager
