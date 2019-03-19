const CherryError = require('../abstract/CherryError')

class MiddlewareNotFoundException extends CherryError {
  constructor (name) {
    super(`An error occured : The middleware '${name}' doesn't exist`)
    this.middlewareName = name
  }
}

module.exports = MiddlewareNotFoundException
