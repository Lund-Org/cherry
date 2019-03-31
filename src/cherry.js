const Dispatcher = require('./processor/Dispatcher')
const PluginConfigurator = require('./configuration/PluginConfigurator')
const HookConfigurator = require('./configuration/HookConfigurator')
const MiddlewareConfigurator = require('./configuration/MiddlewareConfigurator')
const RouteConfigurator = require('./configuration/RouteConfigurator')
const ORMManager = require('./orm/ORMManager')
const CherryServerManager = require('./server/CherryServerManager')

class Cherry {
  constructor () {
    this.dispatcher = new Dispatcher(this)

    this.pluginConfigurator = new PluginConfigurator()
    this.hookConfigurator = new HookConfigurator()
    this.middlewareConfigurator = new MiddlewareConfigurator()
    this.routeConfigurator = new RouteConfigurator()

    this.ormManager = new ORMManager(this)
    this.cherryServerManager = new CherryServerManager(this)
  }

  /**
   * Configure the entire framework instance
   * @param {Object} options The options to configure Cherry
   */
  configure (options = {}) {
    // caca
    // if (check.isDefined(options, 'onError')) {
    //   this.dispatcher.onError(options.onError)
    // }

    this.pluginConfigurator.configure(options)
    this.hookConfigurator.configure(options)
    this.middlewareConfigurator.configure(options)
    this.routeConfigurator.configure(options)

    if (this.pluginConfigurator.getPlugin('DatabaseEngine') && typeof options.database !== 'undefined') {
      this.ormManager.setPlugin(this.pluginConfigurator.getPlugin('DatabaseEngine'))
      this.ormManager.checkOptions(options.database)
    }

    this.cherryServerManager.buildServers(options)
  }

  /**
   * Start the server(s) and connect to database(s) if configured to
   */
  async start () {
    await this.cherryServerManager.startServers()
    await this.ormManager.connectDatabase()
  }

  /**
   * Start the server(s) and disconnect from database(s)
   */
  async stop () {
    await this.cherryServerManager.stopServers(async () => {
      await this.ormManager.disconnectDatabase()
    })
  }
}

module.exports = Cherry
