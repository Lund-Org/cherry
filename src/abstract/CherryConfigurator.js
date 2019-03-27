const check = require('../helpers/check')
const ConfiguratorException = require('../configuration/ConfiguratorException')

/**
 * The abstraction of the Configuration classes
 */
class CherryConfigurator {
  constructor (manager) {
    this.manager = manager
  }

  /**
   * Configure the configurator. Method to DRY
   * @param {object} options The options to configure the Configurator
   * @param {string} key The key to check in the options
   * @param {string} methodName The method to call from the manager
   * @param {string} expectedType The type expected in case of errors
   */
  configure (options, key, methodName, expectedType) {
    if (check.isDefined(options, key)) {
      if (Array.isArray(options[key])) {
        options[key].forEach((item) => {
          this.manager[methodName](item)
        })
      } else {
        throw new ConfiguratorException(key, typeof options[key], expectedType)
      }
    }
  }
}

module.exports = CherryConfigurator
