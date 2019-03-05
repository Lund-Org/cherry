const Server = require('./server/server')
const Dispatcher = require('./server/Dispatcher')
const HookManager = require('./hooks/HookManager')
const Route = require('./routes/Route')
const check = require('./helpers/check')
const { HOOK_BEFORE_START_SERVER, HOOK_AFTER_START_SERVER } = require('./hooks/constants')

class Cherry {
  constructor () {
    this.dispatcher = new Dispatcher(this)
    this.http = null
    this.https = null
    this.server = new Server(this.dispatcher)
    this.plugins = {
      ViewEngine: null
    }
    this.hookManager = new HookManager()
  }

  configure (routes, middlewares, hooks, options = {}) {
    let servers = null

    if (check.isDefined(options, 'onError')) {
      this.dispatcher.onError(options.onError)
    }

    // configure the routes
    routes.forEach((route) => {
      if (route instanceof Route) {
        this.dispatcher.addRoute(route)
      } else {
        this.dispatcher.addRoute(new Route(route))
      }
    })

    // configure the hooks
    hooks.forEach((hook) => {
      this.hookManager.addHook(hook)
    })
    this.hookManager.sortByPriorities()

    // configure the middlewares
    middlewares.forEach((middleware) => {
      this.dispatcher.addMiddleware(middleware)
    })

    servers = this.server.createServer(options)
    this.http = servers.http
    this.https = servers.https
  }

  start (options) {
    // Refacto the both block below (this is the same things with 2 different values)
    if (typeof this.http !== 'undefined' && this.http) {
      console.log(`Starting the http server on the port : ${options.httpPort}`)
      this.hookManager.resolve(HOOK_BEFORE_START_SERVER, {
        cherry: this,
        server: this.http
      })
      this.http.listen(options.httpPort)
      this.hookManager.resolve(HOOK_AFTER_START_SERVER, {
        cherry: this,
        server: this.http
      })
    }
    if (typeof this.https !== 'undefined' && this.https) {
      console.log(`Starting the https server on the port : ${options.httpsPort}`)
      this.hookManager.resolve(HOOK_BEFORE_START_SERVER, {
        cherry: this,
        server: this.https
      })
      this.https.listen(options.httpsPort)
      this.hookManager.resolve(HOOK_AFTER_START_SERVER, {
        cherry: this,
        server: this.https
      })
    }
  }

  registerPlugin (plugin) {
    this.plugins[plugin.getIdentifier()] = plugin
  }
}

module.exports = Cherry
