const check = require('../helpers/check')
const RouteException = require('./RouteException')

class Route {
  /**
   * Create the route. The mandatory fields are :
   * - method
   * - path
   * - callback
   * The optionnal ones are :
   * - name
   * - rules
   * - middlewares
   * @param {Object} route The options of the route
   */
  constructor (route) {
    if (!check.isDefinedAndNotNull(route, 'method')) {
      throw new RouteException('method')
    }
    if (!check.isDefinedAndNotNull(route, 'path')) {
      throw new RouteException('path')
    }
    if (!check.isDefinedAndNotNull(route, 'callback')) {
      throw new RouteException('callback')
    }
    this.method = route.method
    this.path = route.path
    this.callback = route.callback
    this.name = check.isDefinedAndNotNull(route, 'name') ? route.name : 'no-name-route'
    if (!this.path.endsWith('/')) {
      this.path += '/'
    }
    if (this.path.match(/:([A-Za-z0-9_-~]+)/g)) {
      this.attributesMatches = this.path.match(/:([A-Za-z0-9_-~]+)/g).map((routeAttribute) => {
        // We remove the ':'
        return routeAttribute.substr(1)
      })
      this.routeRegex = new RegExp(`^${this.path.replace(/:[A-Za-z0-9_-~]+/g, '(.+)')}$`)
    } else {
      this.attributesMatches = []
      this.routeRegex = new RegExp(`^${this.path}$`)
    }
    this.rules = check.isDefinedAndNotNull(route, 'rules') ? route.rules : {}
    this.middlewares = check.isDefinedAndNotNull(route, 'middlewares') ? route.middlewares : []
  }

  /**
   * Return a clone of the current route
   * @return {Route}
   */
  clone () {
    return new Route(this)
  }

  /**
   * Check if the route match the HTTP method
   * @param {string} method The HTTP method of the current request
   * @return {boolean}
   */
  matchMethod (method) {
    if (this.method.includes(method) || this.method.length === 0) {
      return true
    } else {
      return false
    }
  }

  /**
   * Check if the route match the given path
   * @param {string} path The path of the current route requested
   * @return {object} Return the attribute object if everything match, or null if it doesn't
   */
  matchRoute (path) {
    let result = path.match(this.routeRegex)

    if (!result) {
      console.log(`Route "${this.routeRegex}" doesn't match`)
      return null
    }

    result.shift()

    const attributes = this.attributesMatches.reduce((carry, attributeName, index) => {
      carry[attributeName] = result[index]
      return carry
    }, {})

    for (const attributeName in attributes) {
      if (check.isDefinedAndNotNull(this.rules, attributeName)) {
        if (attributes[attributeName].match(this.rules[attributeName]) === null) {
          console.log(`Params ${attributeName} doesn't match`)
          return null
        }
      }
    }

    return Object.freeze(attributes)
  }
}

module.exports = Route
