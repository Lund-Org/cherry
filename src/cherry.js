const Dispatcher = require('./processor/Dispatcher')
const PluginConfigurator = require('./configuration/PluginConfigurator')
const HookConfigurator = require('./configuration/HookConfigurator')
const MiddlewareConfigurator = require('./configuration/MiddlewareConfigurator')
const RouteConfigurator = require('./configuration/RouteConfigurator')
const RedirectionConfigurator = require('./configuration/RedirectionConfigurator')
const DefaultErrorPageConfigurator = require('./configuration/DefaultErrorPageConfigurator')
const ORMManager = require('./orm/ORMManager')
const CherryServerManager = require('./server/CherryServerManager')

class Cherry {
  constructor () {
    this.dispatcher = new Dispatcher(this)

    this.pluginConfigurator = new PluginConfigurator()
    this.hookConfigurator = new HookConfigurator()
    this.middlewareConfigurator = new MiddlewareConfigurator()
    this.routeConfigurator = new RouteConfigurator()
    this.redirectionConfigurator = new RedirectionConfigurator()
    this.defaultErrorPageConfigurator = new DefaultErrorPageConfigurator()

    this.ormManager = new ORMManager(this)
    this.cherryServerManager = new CherryServerManager(this)
  }

  /**
   * Configure the entire framework instance
   * @param {Object} options The options to configure Cherry
   */
  configure (options = {}) {
    this.pluginConfigurator.configure(options)
    this.hookConfigurator.configure(options)
    this.middlewareConfigurator.configure(options)
    this.routeConfigurator.configure(options)
    this.redirectionConfigurator.configure(options)
    this.defaultErrorPageConfigurator.configure(options)

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
