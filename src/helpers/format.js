module.exports = {
  /**
   * Add a slash at the end of the url if it's not already there
   * @param {string} url An url
   * @return {string}
   */
  refineUrl (url) {
    if (!url.endsWith('/')) {
      url += '/'
    }

    return url
  }
}
