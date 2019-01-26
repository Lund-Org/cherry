const httpModule = require('http')
const httpsModule = require('https')
const check = require('../helpers/check')
const responseBuiltins = require('../builtins/response')

class Server {
  constructor (dispatcher) {
    this.dispatcher = dispatcher
  }

  /**
   * Method to handle requests and send response depending the url
   * Format of the options method :
   * {
   *    controlOptions: { <the options set as header result> },
   *    httpPort: <integer>,
   *    httpsPort: <integer>,
   *    httpsKeys: {}
   * }
   * @param {Object} options The options object
   */
  setupDefaultOptions (options) {
    if (!check.isDefined(options, 'controlOptions')) {
      options.controlOptions = {}
    }

    if (!check.isDefined(options.controlOptions, 'Access-Control-Allow-Origin')) {
      options.controlOptions['Access-Control-Allow-Origin'] = '*'
    }
    if (!check.isDefined(options.controlOptions, 'Access-Control-Request-Method')) {
      options.controlOptions['Access-Control-Request-Method'] = '*'
    }
    if (!check.isDefined(options.controlOptions, 'Access-Control-Allow-Methods')) {
      options.controlOptions['Access-Control-Allow-Methods'] = 'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    }
    if (!check.isDefined(options.controlOptions, 'Access-Control-Allow-Headers')) {
      options.controlOptions['Access-Control-Allow-Headers'] = '*'
    }
    if (!check.isDefined(options, 'httpsPort') && !check.isDefinedAndNotNull(options, 'httpsKeys')) {
      options.httpsKeys = {}
    }
  }

  /**
   * Create a http server and/or a https server
   * @param {object} options The options to setup the options
   * @return {object}
   */
  createServer (options) {
    let servers = { http: null, https: null }
    this.setupDefaultOptions(options)

    const initializeServer = (req, res) => {
      for (const optionIndex in options.controlOptions) {
        res.setHeader(optionIndex, options.controlOptions[optionIndex])
      }
      if (req.method === 'OPTIONS' && options['Access-Control-Allow-Methods'].includes('OPTIONS')) {
        res.writeHead(200)
        res.end()
        return
      }
      for (let responseBuiltinName in responseBuiltins) {
        res[responseBuiltinName] = responseBuiltins[responseBuiltinName].bind(res)
      }
      res.cherry = this.dispatcher.cherry
      this.handleRequest(this.dispatcher, req, res)
    }

    if (check.isDefinedAndValid(options, 'httpPort')) {
      servers.http = httpModule.createServer(initializeServer)
    }
    if (check.isDefinedAndValid(options, 'httpsPort')) {
      servers.https = httpsModule.createServer(Object.assign(
        {},
        options.httpsKeys
      ), initializeServer)
    }

    return servers
  }

  /**
   * Method to handle requests and send response depending the url
   * @param {Object} dispatcher Manage the routing
   * @param {Object} request The current request
   * @param {Object} response The object to send response
   */
  handleRequest (dispatcher, request, response) {
    try {
      dispatcher.dispatch(request, response)
    } catch (err) {
      console.log('handle request error', err)
      response.writeHead(500, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(err))
    }
  }
}

module.exports = Server
