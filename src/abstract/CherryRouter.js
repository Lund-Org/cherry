const check = require('../helpers/check')
const merge = require('deepmerge')

/**
 * The abstraction of the Router classes
 */
class CherryRouter {
  constructor (basedRouteConfig, instanceClass) {
    this.basedRouteConfig = basedRouteConfig
    this.instanceClass = instanceClass
  }

  /**
   * Returns the type of the router using the route constants
   */
  static getType () { }

  /**
   * The method to check if a route match
   */
  matchRoute (route, request, response) { }

  /**
   * Build the route(s) provided by the router
   */
  build () { }

  /**
   * Return a clone of the current route
   * @return {Route}
   */
  clone () {
    const ClassToClone = this.instanceClass

    return new ClassToClone(merge({}, this.basedRouteConfig))
  }

  /**
   * Set a value from the config or a default value if not present
   */
  _setParameters (routeConfig, name, defaultValue) {
    if (check.isDefinedAndNotNull(routeConfig, name)) {
      this[name] = routeConfig[name]
    } else {
      this[name] = defaultValue
    }
  }
}

module.exports = CherryRouter
