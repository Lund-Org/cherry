const httpModule = require('http')
const httpsModule = require('https')
const check = require('../helpers/check')

/**
 * Method to handle requests and send response depending the url
 * Format of the options method :
 * {
 *    controlOptions: { <the options set as header result> },
 *    serverOptions: { <the options sent to the http(s).createServer method> },
 *    httpPort: <integer>,
 *    httpsPort: <integer>
 * }
 * @param {Object} options The options object
 */
function setupDefaultOptions (options) {
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
  if (!check.isDefined(options, 'httpPort')) {
    options.httpPort = 4000
  }
  if (!check.isDefined(options, 'httpsPort')) {
    options.httpsPort = 5000

    if (!check.isDefinedAndNotNull(options, 'httpsKeys')) {
      options.httpsKeys = {}
    }
  }
}

/**
 * Create a http server and/or a https server
 * @param {Dispatcher} dispatcher The dispatcher manager
 * @param {object} options The options to setup the options
 * @return {object}
 */
function createServer (dispatcher, options) {
  let servers = { http: null, https: null }
  setupDefaultOptions(options)

  const initializeServer = (req, res) => {
    for (const optionIndex in options.controlOptions) {
      res.setHeader(optionIndex, options.controlOptions[optionIndex])
    }
    if (req.method === 'OPTIONS' && options['Access-Control-Allow-Methods'].includes('OPTIONS')) {
      res.writeHead(200)
      res.end()
      return
    }
    handleRequest(dispatcher, req, res)
  }

  if (check.isDefinedAndValid(options, 'http')) {
    servers.http = httpModule.createServer(initializeServer)
  }
  if (check.isDefinedAndValid(options, 'https')) {
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
function handleRequest (dispatcher, request, response) {
  try {
    dispatcher.dispatch(request, response)
  } catch (err) {
    console.log(err)
    response.writeHead(500, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(err))
  }
}

module.exports = createServer
