const check = require('../helpers/check')
const CherryHTTPServer = require('./CherryHTTPServer')
const CherryHTTPSServer = require('./CherryHTTPSServer')
const { HOOK_BEFORE_START_SERVER, HOOK_AFTER_START_SERVER } = require('../hooks/constants')

class CherryServerManager {
  constructor (cherry) {
    this.cherry = cherry
    this.servers = []
  }

  /**
   * Build one or multiple servers, each with its own configuration
   * @param {Object} options The options to configure the server(s)
   */
  buildServers (options) {
    if (check.isDefinedAndValid(options, 'servers') && Array.isArray(options.servers)) {
      this.servers = options.servers.map((serverConfig) => {
        let server = null

        if (serverConfig.https) {
          server = new CherryHTTPSServer(this.cherry)
        } else {
          server = new CherryHTTPServer(this.cherry)
        }

        server.setOptions(serverConfig)
        server.create()
        return server
      })
    } else {
      throw new Error('The \'servers\' key is missing in the configuration datas')
    }
  }

  /**
   * Start the configured servers
   */
  startServers () {
    this.servers.forEach((server) => {
      this.cherry.hookConfigurator.trigger(HOOK_BEFORE_START_SERVER, {
        cherry: this.cherry,
        server: server
      })
      server.start()
      this.cherry.hookConfigurator.trigger(HOOK_AFTER_START_SERVER, {
        cherry: this.cherry,
        server: server
      })
    })
  }
}

module.exports = CherryServerManager
