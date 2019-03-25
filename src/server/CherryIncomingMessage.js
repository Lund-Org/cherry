const { IncomingMessage } = require('http')

class CherryIncomingMessage extends IncomingMessage {
  constructor (arg) {
    super(arg)
    this.cherry = null
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
