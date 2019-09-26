const check = require('../helpers/check')

class PluginManager {
  constructor () {
    this.plugins = {
      // Default keys of plugins that are used in the core
      RequestEngine: null,
      ViewEngine: null,
      DatabaseEngine: null
    }
  }

  /**
   * Register a plugin in the list
   */
  registerPlugin (plugin) {
    const name = plugin.getIdentifier()

    if (check.isDefinedAndNotNull(this.plugins, name)) {
      console.warn(`The plugin ${name} has already been defined`)
      console.warn(`The previous class was ${this.plugins[name]} and the new one is ${plugin}`)
    }
    this.plugins[name] = plugin
  }

  /**
   * Retrieves a plugin by its name
   * @param {string} name The name of the plugin required
   * @return {Class}
   */
  getPlugin (name) {
    return this.plugins[name]
  }

  /**
   * Retrieves the registered plugins
   * @return {Object<Class>}
   */
  getPlugins () {
    return this.plugins
  }

  /**
   * Retrieves the list of the plugin types defined
   * @return {Array<string>}
   */
  getPluginTypes () {
    return Object.keys(this.plugins).filter((key) => {
      return !!this.plugins[key]
    })
  }
}

module.exports = PluginManager
