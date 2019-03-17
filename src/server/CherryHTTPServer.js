const http = require('http')
const CherryServer = require('./CherryServer')
const CherryIncomingMessage = require('./CherryIncomingMessage')
const CherryServerResponse = require('./CherryServerResponse')

class CherryHTTPServer extends CherryServer {
  /**
   * Create the HTTP server with custom request and response class
   */
  create () {
    this.server = http.createServer({
      IncomingMessage: CherryIncomingMessage,
      ServerResponse: CherryServerResponse
    }, (req, res) => {
      this.bootstrap(req, res)
    })
  }
}

module.exports = CherryHTTPServer
