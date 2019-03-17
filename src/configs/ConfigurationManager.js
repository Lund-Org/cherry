const GlobalConfiguration = require('./GlobalConfiguration')
const HookConfiguration = require('./HookConfiguration')
const HTTPConfiguration = require('./HTTPConfiguration')
const PluginConfiguration = require('./PluginConfiguration')
const RouteConfiguration = require('./RouteConfiguration')

class ConfigurationManager {
  constructor () {
    this.globalConfiguration = new GlobalConfiguration()
    this.hookConfiguration = new HookConfiguration()
    this.hTTPConfiguration = new HTTPConfiguration()
    this.pluginConfiguration = new PluginConfiguration()
    this.routeConfiguration = new RouteConfiguration()
  }
}

module.exports = ConfigurationManager
