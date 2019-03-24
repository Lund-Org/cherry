const PublicRouters = require('./public_routers')
const CherryRouteManager = require('../abstract/CherryRouteManager')

class PublicRouteManager extends CherryRouteManager {
  /**
   * Register a route and add it to the pool of routes
   * @param {Object} routeConfig The configuration of the route
   */
  registerRoute (routeConfig) {
    super.registerRoute(routeConfig, PublicRouters)
  }
}

module.exports = PublicRouteManager
