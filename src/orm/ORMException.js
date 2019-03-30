const CherryError = require('../abstract/CherryError')

class ORMException extends CherryError {
  constructor (exception, code, data) {
    super(exception.message)
    this.code = code
    this.data = data
    this.stack = exception.stack
  }

  /**
   * To retrieve the options at the moment of the error
   */
  getDataTrace () {
    return this.data
  }
}

module.exports = ORMException
