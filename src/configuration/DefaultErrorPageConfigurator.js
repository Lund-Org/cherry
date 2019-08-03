const fs = require('fs')
const path = require('path')
const CherryConfigurator = require('../abstract/CherryConfigurator')
const check = require('../helpers/check')

/**
 * The configurator of the default error pages
 * Inherits from the abstract CherryConfigurator
 */
class DefaultErrorPageConfigurator extends CherryConfigurator {
  constructor () {
    super({})

    this.manager.clientErrorPage = this.clientErrorPage
    this.manager.serverErrorPage = this.serverErrorPage
  }

  /**
   * Configure the default pages process in case of error
   * @param {Object} options The options set to the cherry instance
   */
  configure (options) {
    if (check.isDefined(options, 'defaultPages')) {
      Object.keys(this.manager).forEach((defaultPage) => {
        if (check.isDefined(options.defaultPages, defaultPage)) {
          this.manager[defaultPage] = options.defaultPages[defaultPage]
        }
      })
    }
  }

  /**
   * The default process in case of a 4xx page
   * @param {CherryIncomingMessage} req The current request
   * @param {CherryServerResponse} res The response object
   */
  clientErrorPage (req, res) {
    const content = fs.readFileSync(path.join(__dirname, '../assets/default_pages/4xx.html'))

    res.html(content.toString(), { statusCode: 404, isRaw: true })
  }

  /**
   * The default process in case of a 5xx page
   * @param {CherryIncomingMessage} req The current request
   * @param {CherryServerResponse} res The response object
   * @param {Error} err The error catch
   */
  serverErrorPage (req, res, err) {
    const content = fs.readFileSync(path.join(__dirname, '../assets/default_pages/5xx.html'))

    res.html(content.toString(), { statusCode: 500, isRaw: true })
  }
}

module.exports = DefaultErrorPageConfigurator
