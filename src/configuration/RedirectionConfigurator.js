const CherryConfigurator = require('../abstract/CherryConfigurator')
const RedirectionManager = require('../redirections/RedirectionManager')
const check = require('../helpers/check')
const format = require('../helpers/format')

class RedirectionConfigurator extends CherryConfigurator {
  constructor () {
    super(new RedirectionManager())
  }

  /**
   * Configure the configurator, this method should be implemented
   */
  configure (options) {
    if (check.isDefined(options, 'redirections')) {
      options.redirections.forEach((redirection) => {
        this.manager.registerRoute(redirection)
      })
    }
  }

  /**
   * Search a matching redirection of the current route
   * @param {string} route The route to analyze
   * @param {CherryIncomingMessage} request The current request
   * @param {CherryServerResponse} response The response object
   * @return {RedirectMatchResponse|null}
   */
  searchMatchingRedirection (route, request, response) {
    let routeResponse = null

    this.manager.getRedirections().some((redirection) => {
      if (redirection.matchRoute(format.refineUrl(route), request, response)) {
        routeResponse = redirection
        return true
      }

      return false
    })

    return routeResponse
  }
}

module.exports = RedirectionConfigurator
