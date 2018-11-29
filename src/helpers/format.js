module.exports = {
  refineUrl (url) {
    if (!url.endsWith('/')) {
      url += '/'
    }

    return url
  }
}
