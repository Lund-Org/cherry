const CherryError = require('../abstract/CherryError')

class RedirectionException extends CherryError {
  constructor (name, definition) {
    super(`An error occured : The option '${name}' is missing or invalid in the redirection definition. Received : ${JSON.stringify(definition)}`)
  }
}

module.exports = RedirectionException
