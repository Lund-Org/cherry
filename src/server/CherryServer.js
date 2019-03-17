const CherryServerConfigurator = require('./CherryServerConfigurator')

class CherryServer {
  constructor (cherry) {
    this.server = null
    this.options = {}
    this.cherry = cherry
  }

  /**
   * Setup the configuration to the server
   * @param {Object} options The options provided to configure the server
   */
  setOptions (options) {
    const serverConfigurator = new CherryServerConfigurator()
    this.options = serverConfigurator.buildConfiguration(options)
  }

  /**
   * Attach additionnal datas to the request
   * @param {CherryIncomingMessage} req The current request
   */
  boundOptionsToRequest (req) {
    req.setCherry(this.cherry)
  }

  /**
   * Attach Access Control options (and other things) to the response object
   * @param {CherryServerResponse} res The response object
   */
  boundOptionsToResponse (res) {
    res.boundOptions(this.options.securityOptions)
    res.setCherry(this.cherry)
  }

  /**
   * The handler when a request comes to the server
   * @param {CherryIncomingMessage} req The current request
   * @param {CherryServerResponse} res The response object
   */
  bootstrap (req, res) {
    let shouldContinue = true

    this.boundOptionsToRequest(req)
    this.boundOptionsToResponse(res)
    if (this.options.optionCallback === null) {
      shouldContinue = !this.defaultOptionsManagement(req, res)
    } else if (typeof this.options.optionCallback === 'function') {
      shouldContinue = !this.options.optionCallback()
    }

    if (shouldContinue) {
      try {
        this.cherry.dispatcher.dispatch(req, res)
      } catch (error) {
        if (this.errorCallback) {
          this.errorCallback(req, res, error)
        } else {
          this.defaultErrorManagement(res, error)
        }
      }
    }
  }

  /**
   * The handler when a request comes to the server
   */
  start () {
    console.log(`Start server on the port : ${this.options.port}`)
    this.server.listen(this.options.port)
  }

  /* ---- Default behaviours ---- */

  /**
   * The default behavior in case of an option (to not block the ajax calls)
   * @param {CherryIncomingMessage} req The current request
   * @param {CherryServerResponse} res The response object
   */
  defaultOptionsManagement (req, res) {
    if (req.method === 'OPTIONS' && this.options.securityOptions['Access-Control-Allow-Methods'].includes('OPTIONS')) {
      res.writeHead(200)
      res.end()
      return true
    }

    return false
  }

  /**
   * The default behavior in case of an error
   * Can be override if the 'onError' option has been set in the options.server object
   * @param {CherryServerResponse} res The response object
   * @param {Error} error The exception thrown
   */
  defaultErrorManagement (res, error) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(error))
  }
}

module.exports = CherryServer
