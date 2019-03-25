class RouteMatchResponse {
  constructor () {
    this.matchingRoute = null
    this.attributes = {}
    this.stop = false
  }

  /**
   * Retrieves the matching route
   * @return {CherryRouter} The matching route object
   */
  getMatchingRoute () {
    return this.matchingRoute
  }

  /**
   * Set the matching route
   * @param {CherryRouter} matchingRoute The route which matches with the request
   */
  setMatchingRoute (matchingRoute) {
    this.matchingRoute = matchingRoute
  }

  /**
   * Retrieves the attributes of the route
   * @return {Object} The attributes of the route
   */
  getAttributes () {
    return this.attributes
  }

  /**
   * Save the attributes found in the path of the route
   * @param {Object} attributes The attributes found in the path of the route
   */
  setAttributes (attributes) {
    this.attributes = attributes
  }

  /**
   * Check if we should stop the process (response already done)
   * @return {boolean} The status if the process should stop
   */
  shouldStop () {
    return this.stop
  }

  /**
   * Set if the process should stop
   * @param {boolean} match The status if the process should stop
   */
  setStop (stop) {
    this.stop = stop
  }
}

module.exports = RouteMatchResponse
