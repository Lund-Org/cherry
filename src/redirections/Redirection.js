const url = require('url')
const check = require('../helpers/check')
const RedirectionException = require('./RedirectionException')

class Redirection {
  /**
   * Create the redirection. The mandatory fields are :
   * - matchUrl
   * - targetUrl
   * - statusCode (which are between 300 and 310)
   * Optionnal field :
   * - keepQueryString
   * @param {Object} redirectionConfig The options of the redirection
   */
  constructor (redirectionConfig) {
    this.keepQueryString = false
    this._setOption(redirectionConfig, 'matchUrl')
    this._setOption(redirectionConfig, 'targetUrl')
    this._setOption(redirectionConfig, 'statusCode')
    if (check.isDefined(redirectionConfig, 'keepQueryString')) {
      this.keepQueryString = !!redirectionConfig.keepQueryString
    }

    // Check type for matchUrl
    if (typeof this.matchUrl === 'string') {
      this.matchUrl = new RegExp(this.matchUrl)
    }
    if (!(this.matchUrl instanceof RegExp)) {
      throw new RedirectionException('matchUrl', redirectionConfig)
    }
    // Check type for targetUrl
    if (typeof this.targetUrl !== 'string') {
      throw new RedirectionException('targetUrl', redirectionConfig)
    }
    // Check type for statusCode
    if (typeof this.statusCode === 'string') {
      this.statusCode = parseInt(this.statusCode)
    }
    if (this.statusCode < 300 || this.statusCode > 310) {
      throw new RedirectionException('statusCode', redirectionConfig)
    }
  }

  /**
   * Check if the current route should be redirected
   * @param {string} route The current route to check
   */
  matchRoute (route) {
    return !!route.match(this.matchUrl)
  }

  /**
   * Trigger the redirection
   * @param {string} route The current route requested
   * @param {CherryIncomingMessage} request The current request
   * @param {CherryServerResponse} response The current response
   */
  execute (route, request, response) {
    const result = route.match(this.matchUrl)
    const parsedUrl = url.parse(request.url, true)
    let targetUrl = this.targetUrl

    for (let i = 1; i < result.length; ++i) {
      targetUrl = targetUrl.replace(`$${i}`, result[i])
    }
    targetUrl = targetUrl.replace(/\$\d/gi, '')

    if (this.keepQueryString) {
      targetUrl += parsedUrl.search
    }

    response.redirect(targetUrl, this.statusCode)
  }

  /**
   * Check if the mandatory option exists in the definition and set it
   * @param {Object} redirectionConfig The definition of a redirection
   * @param {string} key The key of the definition/attribute
   */
  _setOption (redirectionConfig, key) {
    if (!check.isDefinedAndNotNull(redirectionConfig, key)) {
      throw new RedirectionException(key, redirectionConfig)
    }
    this[key] = redirectionConfig[key]
  }
}

module.exports = Redirection
