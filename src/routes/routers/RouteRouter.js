const check = require('../../helpers/check')
const { ROUTE } = require('../constants')
const CherryRouter = require('../../abstract/CherryRouter')
const RouteException = require('../exceptions/RouteException')
const RouteMatchResponse = require('../RouteMatchResponse')
const merge = require('deepmerge')

/**
 * The router which manages the route registered in the application
 */
class RouteRouter extends CherryRouter {
  /**
   * Create the route. The mandatory fields are :
   * - path
   * - callback
   * The optionnal ones are :
   * - method
   * - name
   * - rules
   * - middlewares
   * @param {Object} route The options of the route
   */
  constructor (routeConfig) {
    super(routeConfig, RouteRouter)
    this._checkConfig(routeConfig)
    this.path = routeConfig.path
    this.callback = routeConfig.callback
    this._setParameters(routeConfig, 'method', null)
    this._setParameters(routeConfig, 'name', 'no-name-route-')
    if (!this.path.endsWith('/')) {
      this.path += '/'
    }
    this.attributesMatches = []
    this.routeRegex = /(.+)/
    this._setParameters(routeConfig, 'rules', {})
    this._setParameters(routeConfig, 'middlewares', [])
    this._manageRouteParameters()
  }

  /**
   * Returns the type of the router using the route constants
   */
  static getType () {
    return ROUTE
  }

  /**
   * The method to check if a route match
   * @param {string} route The path of the request
   * @param {CherryIncomingRequest} request The current incoming request
   * @param {CherryServerResponse} response The server response object
   * @return {Object|null} An object of the matching route parameters (empty object if no route parameters) or null it the route doesn't match
   */
  matchRoute (route, request, response) {
    const routeMatchResponse = new RouteMatchResponse()

    if (this.method.includes(request.method.toUpperCase()) || this.method.includes('*') || this.method === null) {
      let result = route.match(this.routeRegex)

      if (result) {
        result.shift()
        const attributes = this.attributesMatches.reduce((carry, attributeName, index) => {
          carry[attributeName] = result[index]
          return carry
        }, {})

        routeMatchResponse.setMatchingRoute(this.clone())
        for (const attributeName in attributes) {
          if (check.isDefinedAndNotNull(this.rules, attributeName)) {
            if (attributes[attributeName].match(this.rules[attributeName]) === null) {
              // console.warn(`Parameter ${attributeName} doesn't match`)
              routeMatchResponse.setMatchingRoute(null)
              break
            }
          }
        }

        routeMatchResponse.setAttributes(Object.freeze(attributes))
      }
    }

    return routeMatchResponse
  }

  /**
   * Get the built route
   */
  build () {
    return [ this ]
  }

  /**
   * Get the built route
   */
  addContext (contextRouter) {
    this.name = contextRouter.name + this.name
    if (contextRouter.method !== null && this.method === null) {
      this.method = contextRouter.method
    }
    this.path = (contextRouter.path + this.path).replace(/\/+/g, '/')
    this.middlewares = [...new Set([...contextRouter.middlewares, ...this.middlewares])]
    this.rules = merge(contextRouter.rules, this.rules)
    this._manageRouteParameters()
    this.basedRouteConfig = {
      name: this.name,
      path: this.path,
      callback: this.callback,
      method: this.method ? this.method.slice(0) : null,
      rules: merge({}, this.rules),
      middlewares: this.middlewares.slice(0)
    }
  }

  /**
   * The method to check if a route match
   */
  _checkConfig (routeConfig) {
    if (!check.isDefinedAndNotNull(routeConfig, 'path')) {
      throw new RouteException('path')
    }
    if (!check.isDefinedAndNotNull(routeConfig, 'callback')) {
      throw new RouteException('callback')
    }
  }

  /**
   * The method to check if a route match
   */
  _manageRouteParameters () {
    // @todo : Manage the optionnal parameters
    if (this.path.match(/:([A-Za-z0-9_-]+)/g)) {
      this.attributesMatches = this.path.match(/:([A-Za-z0-9_-]+)/g).map((routeAttribute) => {
        // We remove the ':'
        return routeAttribute.substr(1)
      })
      this.routeRegex = new RegExp(`^${this.path.replace(/:[A-Za-z0-9_-]+/g, '([A-Za-z0-9_.\\-~]+)')}$`)
    } else {
      this.attributesMatches = []
      this.routeRegex = new RegExp(`^${this.path}$`)
    }
  }
}

module.exports = RouteRouter
