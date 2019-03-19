const Dispatcher = require('./server/Dispatcher')
const PluginConfigurator = require('./configuration/PluginConfigurator')
const HookConfigurator = require('./configuration/HookConfigurator')
const MiddlewareConfigurator = require('./configuration/MiddlewareConfigurator')
const ORMManager = require('./orm/ORMManager')
const CherryServerManager = require('./server/CherryServerManager')
const Route = require('./routes/Route')
const check = require('./helpers/check')

class Cherry {
  constructor () {
    this.dispatcher = new Dispatcher(this)

    this.pluginConfigurator = new PluginConfigurator()
    this.hookConfigurator = new HookConfigurator()
    this.middlewareConfigurator = new MiddlewareConfigurator()

    this.ormManager = new ORMManager()
    this.cherryServerManager = new CherryServerManager(this)
  }

  configure (routes, options = {}) {
    // caca
    if (check.isDefined(options, 'onError')) {
      this.dispatcher.onError(options.onError)
    }

    this.pluginConfigurator.configure(options)
    this.hookConfigurator.configure(options)
    this.middlewareConfigurator.configure(options)

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

    this.dispatcher.setPublicFolder(options.publicFolder)
    this.cherryServerManager.buildServers(options)
  }

  start () {
    this.cherryServerManager.startServers()
    this.ormManager.connectDatabase()
  }
}

module.exports = Cherry
