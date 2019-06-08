const Redirection = require('../redirections/Redirection')

class RedirectionManager {
  constructor () {
    this.redirections = []
  }

  /**
   * Create a Redirection and push it in the redirection pool
   * @param {Object} redirectionPayload The definition of a redirection
   */
  registerRoute (redirectionPayload) {
    this.redirections.push(new Redirection(redirectionPayload))
  }

  /**
   * Getter of the redirections
   * @return {Array} The redirection pool
   */
  getRedirections () {
    return this.redirections
  }
}

module.exports = RedirectionManager
