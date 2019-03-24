const Configurator = require('../abstract/CherryConfigurator')
const ConfiguratorException = require('./ConfiguratorException')
const RouteManager = require('../routes/RouteManager')
const PublicRouteManager = require('../routes/PublicRouteManager')
const check = require('../helpers/check')
const routers = require('../routes/routers')
const EventEmitter = require('events').EventEmitter

class RouteConfigurator extends Configurator {
  constructor () {
    super({
      routeManager: new RouteManager(routers),
      publicRouteManager: new PublicRouteManager()
    })
    this.eventEmitter = new EventEmitter()
  }

  /**
   * Configure the configurator, this method should be implemented
   */
  configure (options) {
    if (check.isDefined(options, 'routes')) {
      let hasRoutes = false

      hasRoutes = hasRoutes || this._configure(options.routes, 'router', 'routeManager')
      hasRoutes = hasRoutes || this._configure(options.routes, 'publicRouter', 'publicRouter')

      if (!hasRoutes) {
        throw new ConfiguratorException('routes', typeof options.routes, 'Object (with at least router or publicRouter not empty)')
      }
    } else {
      throw new ConfiguratorException('routes', undefined, 'Object')
    }

    this.manager.routeManager.getRoutes().forEach((route) => {
      this.eventEmitter.on(route.name, (req, res) => {
        // do things ????
      })
    })
  }

  /**
   * Configure the configurator, this method should be implemented
   */
  getRoutes () {
    console.log(this.manager.routeManager.getRoutes())
    console.log(this.manager.publicRouteManager.getRoutes())
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
}

module.exports = RouteConfigurator
