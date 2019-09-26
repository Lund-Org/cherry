const CherryError = require('../abstract/CherryError')

class MiddlewareBadConfigurationException extends CherryError {
  constructor (name, key, type) {
    if (typeof name === 'undefined') {
      super('An error occured : The middleware doesn\'t have a name')
    } else {
      super(`An error occured : The middleware '${name}' has a missing field '${key}' or a wrong type (${type} expected)`)
    }
  }
}

module.exports = MiddlewareBadConfigurationException
