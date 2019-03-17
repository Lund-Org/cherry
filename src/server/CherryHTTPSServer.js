const https = require('https')
const CherryServer = require('./CherryServer')
const CherryIncomingMessage = require('./CherryIncomingMessage')
const CherryServerResponse = require('./CherryServerResponse')

class CherryHTTPSServer extends CherryServer {
  /**
   * Create the HTTPS server with custom request and response class
   */
  create () {
    this.server = https.createServer(
      Object.assign({
        IncomingMessage: CherryIncomingMessage,
        ServerResponse: CherryServerResponse
      }, this.options.httpsOptions),
      (req, res) => {
        this.bootstrap(req, res)
      }
    )
  }
}

module.exports = CherryHTTPSServer
