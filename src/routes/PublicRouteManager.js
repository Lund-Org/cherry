const path = require('path')
const fs = require('fs')

class PublicRouteManager {
  constructor () {
    this.path = null
  }

  /**
   * Set the public path and check if it is a directory + if we have the read right
   * @param {string} publicFolder The public folder
   */
  setPublicFolder (publicFolder) {
    if (!publicFolder) {
      return
    }

    // Check is the given path is a directory
    fs.lstatSync(publicFolder).isDirectory()
    // Check the read permission and the existence
    fs.accessSync(publicFolder, fs.constants.R_OK)
    this.path = publicFolder
  }

  /**
   * Check if a resource exists and if yes render it
   * @param {Object} request The current request
   */
  checkPublicResource (request, response) {
    if (!this.path) {
      return false
    }

    try {
      let content = fs.readFileSync(path.join(this.path, require('url').parse(request.url, true).pathname), 'utf8')

      response.writeHead(200, {
        'Content-Length': content.length
      })
      response.end(content)
      return true
    } catch (e) {
      return false
    }
  }
}

module.exports = PublicRouteManager
