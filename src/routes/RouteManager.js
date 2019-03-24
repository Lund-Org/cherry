const CherryRouteManager = require('../abstract/CherryRouteManager')

class RouteManager extends CherryRouteManager {
  constructor (routers) {
    super()
    this.Routers = routers
  }

  /**
   * Register a route and add it to the pool of routes
   * @param {Object} routeConfig The configuration of the route
   */
  registerRoute (routeConfig) {
    super.registerRoute(routeConfig, this.Routers)
  }
}

module.exports = RouteManager
