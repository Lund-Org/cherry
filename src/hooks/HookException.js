const CherryError = require('../abstract/CherryError')

class HookException extends CherryError {
  constructor (option) {
    super(`An error occured : The option '${option}' is missing or invalid in the hook definition`)
    this.option = option
  }
}

module.exports = HookException
