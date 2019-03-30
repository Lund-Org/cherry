const CherryConfigurator = require('../abstract/CherryConfigurator')
const PluginManager = require('../plugins/PluginManager')

/**
 * The configurator of the plugins
 * Inherits from the abstract CherryConfigurator
 */
class PluginConfigurator extends CherryConfigurator {
  constructor () {
    super(new PluginManager())
  }

  /**
   * Configure the registration of multiple plugins
   * @param {Object} options The options set to the cherry instance
   */
  configure (options) {
    super.configure(options, 'plugins', 'registerPlugin', 'Array')
  }

  /**
   * Configure the registration of multiple plugins
   * @param {string} name The name of the plugin required
   * @return {Class}
   */
  getPlugin (name) {
    return this.manager.getPlugin(name)
  }

  /**
   * Get an instance of the plugin requested
   * @param {string} name The name of the plugin required
   * @return {mixed}
   */
  getPluginInstance (name) {
    let PluginClass = this.getPlugin(name)

    if (typeof PluginClass !== 'undefined' && PluginClass) {
      return new PluginClass()
    } else {
      return null
    }
  }

  /**
   * Retrieves the registered plugins
   * @return {Object<Class>}
   */
  getPlugins () {
    return this.manager.getPlugins()
  }

  /**
   * Retrieves the list of the plugin types defined
   * @return {Array<string>}
   */
  getPluginTypes () {
    return this.manager.getPluginTypes()
  }
}

module.exports = PluginConfigurator
