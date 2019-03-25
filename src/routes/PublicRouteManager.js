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

  /**
   * Sort the routes by priorities
   */
  sortByPriorities () {
    this.routes.sort((routeA, routeB) => {
      if (routeA.priority < routeB.priority) {
        return -1
      } else if (routeA.priority === routeB.priority) {
        return 0
      } else {
        return 1
      }
    })
  }
}

module.exports = PublicRouteManager
