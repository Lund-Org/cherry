const { IncomingMessage } = require('http')
const requestBuiltins = require('../builtins/request')

class CherryIncomingMessage extends IncomingMessage {
  constructor (arg) {
    super(arg)
    this.cherry = null

    // Bind the builtins methods
    for (let requestBuiltinName in requestBuiltins) {
      this[requestBuiltinName] = requestBuiltins[requestBuiltinName].bind(this)
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
}

module.exports = CherryIncomingMessage
