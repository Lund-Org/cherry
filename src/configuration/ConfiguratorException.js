const CherryError = require('../abstract/CherryError')

class ConfiguratorException extends CherryError {
  constructor (key, type, expectedType) {
    super(`An error occured : The option '${key}' is of type '${type}', expected ${expectedType}`)
  }
}

module.exports = ConfiguratorException
