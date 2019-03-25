const CherryError = require('../../abstract/CherryError')

class RouteManagerException extends CherryError {
  constructor (config, error) {
    super(`An error occured : ${error}. The route config sent was : ${JSON.stringify(config)}`)
  }
}

module.exports = RouteManagerException
