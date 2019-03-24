class RouteMatchResponse {
  constructor () {
    this.match = false
    this.attributes = {}
    this.stop = false
  }

  /**
   * Retrieves if the route match or not
   * @return {boolean} The status of the match
   */
  isMatching () {
    return this.match
  }

  /**
   * Retrieves if the route match or not
   * @param {boolean} match The status of the match
   */
  setMatch (match) {
    this.match = match
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
