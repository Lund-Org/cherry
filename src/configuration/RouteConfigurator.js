const CherryConfigurator = require('../abstract/CherryConfigurator')
const ConfiguratorException = require('./ConfiguratorException')
const RouteManager = require('../routes/RouteManager')
const PublicRouteManager = require('../routes/PublicRouteManager')
const check = require('../helpers/check')
const format = require('../helpers/format')
const routers = require('../routes/routers')

class RouteConfigurator extends CherryConfigurator {
  constructor () {
    super({
      routeManager: new RouteManager(routers),
      publicRouteManager: new PublicRouteManager()
    })
  }

  /**
   * Configure the configurator, this method should be implemented
   */
  configure (options) {
    if (check.isDefined(options, 'routes')) {
      let hasRoutes = false

      hasRoutes = this._configure(options.routes, 'router', 'routeManager') || hasRoutes
      hasRoutes = this._configure(options.routes, 'publicRouter', 'publicRouteManager') || hasRoutes

      if (!hasRoutes) {
        throw new ConfiguratorException('routes', typeof options.routes, 'Object (with at least router or publicRouter not empty)')
      }
    } else {
      throw new ConfiguratorException('routes', undefined, 'Object')
    }

    this._configurePublicRoutes()
  }

  /**
   * Search the matching route
   * @param {string} route The route to analyze
   * @param {CherryIncomingMessage} request The current request
   * @param {CherryServerResponse} response The response object
   * @return {RouteMatchResponse|null}
   */
  searchMatchingRoute (route, request, response) {
    let routeResponse = null

    routeResponse = this._searchMatchingRoute(
      this.manager.publicRouteManager,
      route,
      request,
      response
    )

    if (routeResponse) {
      return routeResponse
    } else {
      return this._searchMatchingRoute(
        this.manager.routeManager,
        format.refineUrl(route),
        request,
        response
      )
    }
  }

  /**
   * Add routes to the right manager
   * @param {Array} routes The routes to register
   * @param {string} name The name of the key in the routes options
   * @param {string} managerName The key of the manager to use
   * @return {boolean} The presence of routes
   */
  _configure (routes, name, managerName) {
    let hasRoutes = false

    if (check.isDefined(routes, name)) {
      if (Array.isArray(routes[name])) {
        routes[name].forEach((route) => {
          hasRoutes = true
          this.manager[managerName].registerRoute(route)
        })
      } else {
        throw new ConfiguratorException(`routes.${name}`, typeof routes[name], 'Array')
      }
    }

    return hasRoutes
  }

  /**
   * Configure the public routes
   */
  _configurePublicRoutes () {
    this.manager.publicRouteManager.sortByPriorities()
  }

  /**
   * Search if a route match in a manager
   * @param {CherryRouterManager} manager The route manager to use
   * @param {string} route The route to analyze
   * @param {CherryIncomingMessage} req The current request
   * @param {CherryServerResponse} res The response object
   * @return {RouteMatchResponse|null}
   */
  _searchMatchingRoute (manager, route, req, res) {
    let routeResponse = null

    manager.getRoutes().some((publicRoute) => {
      let tmp = publicRoute.matchRoute(route, req, res)

      if (tmp.getMatchingRoute()) {
        routeResponse = tmp
        return true
      }
      return false
    })

    return routeResponse
  }
}

module.exports = RouteConfigurator
