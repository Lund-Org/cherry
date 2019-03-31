const { ServerResponse } = require('http')
const responseBuiltins = require('../builtins/response')

class CherryServerResponse extends ServerResponse {
  constructor (arg) {
    super(arg)

    // Bind the builtins methods
    for (let responseBuiltinName in responseBuiltins) {
      this[responseBuiltinName] = responseBuiltins[responseBuiltinName].bind(this)
    }
    this.cherry = null
  }

  /**
   * Bound the security headers to the response
   * @param {Object} securityOptions The object of the security headers
   */
  boundOptions (securityOptions) {
    for (const optionIndex in securityOptions) {
      this.setHeader(optionIndex, securityOptions[optionIndex])
    }
  }

  /**
   * Set the cherry instance to the request
   * @param {Cherry} cherry The cherry instance
   */
  setCherry (cherry) {
    this.cherry = cherry
  }

  /**
   * Get the cherry instance bound to the request
   * @return {Cherry} The cherry instance
   */
  getCherry () {
    return this.cherry
  }

  /**
   * Add a response to shutdown the request if nothing has been set as response
   * @param {mixed} resultValue The result value of the callback
   */
  addMissingResponse (resultValue) {
    if (!this.finished) {
      if (typeof resultValue === 'object') {
        this.json(resultValue)
      } else if (typeof resultValue === 'string') {
        this.end(resultValue)
      } else {
        this.end(resultValue.toString())
      }
    }
  }
}

module.exports = CherryServerResponse
