const CherryError = require('../abstract/CherryError')
const check = require('../helpers/check')
const CherryHTTPServer = require('./CherryHTTPServer')
const CherryHTTPSServer = require('./CherryHTTPSServer')
const {
  HOOK_BEFORE_START_SERVER,
  HOOK_AFTER_START_SERVER,
  HOOK_BEFORE_STOP_SERVER,
  HOOK_AFTER_STOP_SERVER
} = require('../hooks/constants')

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
      throw new CherryError('The \'servers\' key is missing in the configuration datas')
    }
  }

  /**
   * Start the configured servers
   */
  async startServers () {
    return this._bulkOnServers({
      before: HOOK_BEFORE_START_SERVER,
      after: HOOK_AFTER_START_SERVER
    }, 'start')
  }

  /**
   * Stop the http(s) server(s)
   */
  async stopServers (callback) {
    return this._bulkOnServers({
      before: HOOK_BEFORE_STOP_SERVER,
      after: HOOK_AFTER_STOP_SERVER
    }, 'stop', callback)
  }

  /**
   * Do operations on each servers (used to start or stop all servers)
   * @param {Object} hookToTrigger The hook to trigger under the format { before: xxx, after: xxx}
   * @param {string} methodToTrigger The method to trigger on the server
   */
  async _bulkOnServers (hookToTrigger, methodToTrigger, additionnalData) {
    for (const server of this.servers) {
      this.cherry.hookConfigurator.trigger(hookToTrigger.before, {
        cherry: this.cherry,
        server: server
      })
      await server[methodToTrigger](additionnalData)
      this.cherry.hookConfigurator.trigger(hookToTrigger.after, {
        cherry: this.cherry,
        server: server
      })
    }
  }
}

module.exports = CherryServerManager
