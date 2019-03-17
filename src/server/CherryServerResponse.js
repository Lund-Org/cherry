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
}

module.exports = CherryServerResponse
