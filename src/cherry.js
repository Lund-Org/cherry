const createServer = require('./server/server')
const Dispatcher = require('./server/Dispatcher')
const Route = require('./routes/Route')
const check = require('./helpers/check')

let dispatcher = new Dispatcher()
let servers = { http: null, https: null }

module.exports = {
  dispatcher,
  servers,
  configure (routes, middlewares, options = {}) {
    if (check.isDefined(options, 'onError')) {
      dispatcher.onError(options.onError)
    }

    routes.forEach((route) => {
      if (route instanceof Route) {
        dispatcher.addRoute(route)
      } else {
        dispatcher.addRoute(new Route(route))
      }
    })
    middlewares.forEach((middleware) => {
      dispatcher.addMiddleware(middleware)
    })

    servers = createServer(dispatcher, options)
  },
  start (options) {
    if (typeof servers.httpPort !== 'undefined' && servers.httpPort) {
      console.log(`Starting the http server on the port : ${options.httpPort}`)
      servers.http.listen(options.httpPort)
    }
    if (typeof servers.httpsPort !== 'undefined' && servers.httpsPort) {
      console.log(`Starting the https server on the port : ${options.httpsPort}`)
      servers.https.listen(options.httpsPort)
    }
  }
}
