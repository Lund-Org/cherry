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
