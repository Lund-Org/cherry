const Dispatcher = require('./server/Dispatcher')
const PluginConfigurator = require('./configuration/PluginConfigurator')
const HookConfigurator = require('./configuration/HookConfigurator')
const ORMManager = require('./orm/ORMManager')
const CherryServerManager = require('./server/CherryServerManager')
const Route = require('./routes/Route')
const check = require('./helpers/check')

class Cherry {
  constructor () {
    this.dispatcher = new Dispatcher(this)

    this.pluginConfigurator = new PluginConfigurator()
    this.hookConfigurator = new HookConfigurator()

    this.ormManager = new ORMManager()
    this.cherryServerManager = new CherryServerManager(this)
  }

  configure (routes, middlewares, options = {}) {
    // caca
    if (check.isDefined(options, 'onError')) {
      this.dispatcher.onError(options.onError)
    }

    this.pluginConfigurator.configure(options)
    this.hookConfigurator.configure(options)

    // configure the routes
    routes.forEach((route) => {
      if (route instanceof Route) {
        this.dispatcher.addRoute(route)
      } else {
        this.dispatcher.addRoute(new Route(route))
      }
    })

    if (this.pluginConfigurator.getPlugin('DatabaseEngine') && typeof options.database !== 'undefined') {
      this.ormManager.setPlugin(this.pluginConfigurator.getPlugin('DatabaseEngine'))
      this.ormManager.checkOptions(options.database)
    }

    // configure the middlewares
    middlewares.forEach((middleware) => {
      this.dispatcher.addMiddleware(middleware)
    })

    this.dispatcher.setPublicFolder(options.publicFolder)
    this.cherryServerManager.buildServers(options)
  }

  start () {
    this.cherryServerManager.startServers()
    this.ormManager.connectDatabase()
  }
}

module.exports = Cherry
