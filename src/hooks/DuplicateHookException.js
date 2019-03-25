const CherryError = require('../abstract/CherryError')

class DuplicateHookException extends CherryError {
  constructor (hookName) {
    super(`The hook '${hookName}' has been duplicated. To shutdown this exception, remove the duplicate or turn off by providing in the options the option 'allowDuplicatedHooks'`)
  }
}

module.exports = DuplicateHookException
