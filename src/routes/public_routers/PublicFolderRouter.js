const fs = require('fs')
const path = require('path')
const check = require('../../helpers/check')
const { PUBLIC_ROUTE_PUBLIC_FOLDER } = require('../constants')
const CherryRouter = require('../../abstract/CherryRouter')
const RouteException = require('../exceptions/RouteException')
const RouteMatchResponse = require('../RouteMatchResponse')

/**
 * The router which manages the ressources in a folder
 */
class PublicFolderRouter extends CherryRouter {
  /**
   * Create the public route to search assets. The mandatory fields are :
   * - path
   * The optionnal ones are :
   * - priority
   * @param {Object} routeConfig The options of the route
   */
  constructor (routeConfig) {
    super(routeConfig, PublicFolderRouter)

    if (!check.isDefinedAndNotNull(routeConfig, 'path') && typeof routeConfig.path === 'string') {
      throw new RouteException('path')
    }

    // Check is the given path is a directory
    fs.lstatSync(routeConfig.path).isDirectory()
    // Check the read permission and the existence
    fs.accessSync(routeConfig.path, fs.constants.R_OK)
    this.path = routeConfig.path
    this._setParameters(routeConfig, 'priority', 0)
  }

  /**
   * Retrieve the type of the Router
   */
  static getType () {
    return PUBLIC_ROUTE_PUBLIC_FOLDER
  }

  /**
   * Check if a route match with this router
   */
  build () {
    return [this]
  }

  /**
   * Check if a route match with this router
   */
  matchRoute (route, request, response) {
    const routeMatchResponse = new RouteMatchResponse()

    try {
      const filePath = path.join(this.path, route)

      if (fs.statSync(filePath) && !fs.lstatSync(filePath).isDirectory()) {
        const readStream = fs.createReadStream(filePath)
        readStream.pipe(response)
        routeMatchResponse.setMatchingRoute(this)
        routeMatchResponse.setStop(true)
      }
    } catch (e) {
      // Not found in the public folder
    }
    return routeMatchResponse
  }
}

module.exports = PublicFolderRouter
