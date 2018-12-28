const Server = require('./server/server')
const Dispatcher = require('./server/Dispatcher')
const Route = require('./routes/Route')
const check = require('./helpers/check')

class Cherry {
  constructor () {
    this.dispatcher = new Dispatcher(this)
    this.http = null
    this.http = null
    this.server = new Server(this.dispatcher)
    this.plugins = {
      ViewEngine: null
    }
  }

  configure (routes, middlewares, options = {}) {
    let servers = null

    if (check.isDefined(options, 'onError')) {
      this.dispatcher.onError(options.onError)
    }

    routes.forEach((route) => {
      if (route instanceof Route) {
        this.dispatcher.addRoute(route)
      } else {
        this.dispatcher.addRoute(new Route(route))
      }
    })
    middlewares.forEach((middleware) => {
      this.dispatcher.addMiddleware(middleware)
    })

    servers = this.server.createServer(options)
    this.http = servers.http
    this.https = servers.https
  }

  start (options) {
    if (typeof this.http !== 'undefined' && this.http) {
      console.log(`Starting the http server on the port : ${options.httpPort}`)
      this.http.listen(options.httpPort)
    }
    if (typeof this.https !== 'undefined' && this.https) {
      console.log(`Starting the https server on the port : ${options.httpsPort}`)
      this.https.listen(options.httpsPort)
    }
  }

  registerPlugin (plugin) {
    this.plugins[plugin.getIdentifier()] = plugin
  }
}

module.exports = Cherry
