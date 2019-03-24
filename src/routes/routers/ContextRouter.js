const check = require('../../helpers/check')
const { ROUTE_CONTEXT } = require('../constants')
const CherryRouter = require('../../abstract/CherryRouter')
const CherryError = require('../../abstract/CherryError')
const RouteException = require('../exceptions/RouteException')
const RouteManager = require('../RouteManager')

/**
 * The router which is just a wrapper of routes.
 * It builds some routes objects, it should not be used for something else than a builder
 */
class ContextRouter extends CherryRouter {
  /**
   * Create the route. The mandatory fields are :
   * - type
   * - collection
   * The optionnal ones are :
   * - name
   * - method
   * - path
   * - middlewares
   * - rules
   * @param {Object} routeConfig The options of the route
   */
  constructor (routeConfig) {
    super(routeConfig, ContextRouter)

    this.routeManager = new RouteManager(require('../routers'))
    this._checkConfig(routeConfig)
    this.collection = routeConfig.collection
    this._setParameters(routeConfig, 'name', 'no-name-route-')
    this._setParameters(routeConfig, 'method', null)
    this._setParameters(routeConfig, 'path', '/')
    this._setParameters(routeConfig, 'middlewares', [])
    this._setParameters(routeConfig, 'rules', [])
    this._setChildrenRoutes()
  }

  /**
   * Returns the type of the router using the route constants
   */
  static getType () {
    return ROUTE_CONTEXT
  }

  /**
   * The method to check if a route match
   * @param {string} route The path of the request
   * @param {CherryIncomingRequest} request The current incoming request
   * @param {CherryServerResponse} response The server response object
   * @return {Object|null} An object of the matching route parameters (empty object if no route parameters) or null it the route doesn't match
   */
  matchRoute (route, request, response) {
    throw new CherryError('The method "matchRoute" should never be called on a ContextRouter')
  }

  /**
   * Get the built route
   */
  build () {
    const childrenRoutes = this.routeManager.getRoutes()

    return childrenRoutes.map((childRoute) => {
      childRoute.addContext(this)
      return childRoute
    })
  }

  /**
   * The method to check if a route match
   */
  _checkConfig (routeConfig) {
    if (!check.isDefinedAndNotNull(routeConfig, 'collection') && Array.isArray(routeConfig.collection)) {
      throw new RouteException('collection')
    }
  }

  /**
   * Uses the RouteManager to render the children routes recursively
   * These routes will be used in the build method
   */
  _setChildrenRoutes () {
    this.collection.forEach((childRouteConfig) => {
      this.routeManager.registerRoute(childRouteConfig)
    })
  }
}

module.exports = ContextRouter
