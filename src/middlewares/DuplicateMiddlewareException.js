const CherryError = require('../abstract/CherryError')

class DuplicateMiddlewareException extends CherryError {
  constructor (middlewareName) {
    super(`The middleware '${middlewareName}' has been duplicated. To shutdown this exception, remove the duplicate or turn off by providing in the options the option 'allowDuplicatedMiddlewares'`)
  }
}

module.exports = DuplicateMiddlewareException
