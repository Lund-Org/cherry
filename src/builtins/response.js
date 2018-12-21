const check = require('../helpers/check')
const fs = require('../helpers/fs')

function response (code, headers, content) {
  this.writeHead(code, headers)
  this.end(content)
}

/**
 * A method to allow the download of files as response
 */
async function download (str, options = null) {
  let content = ''
  let sourceFilename = null
  let defaultOptions = {
    isFilename: true,
    downloadFilename: null,
    headers: {
      'Content-Disposition': 'attachment'
    },
    readFileOptions: 'utf8',
    statusCode: 200
  }

  if (!options) {
    sourceFilename = str
    options = defaultOptions
    options.downloadFilename = sourceFilename
  } else {
    options = Object.assign(defaultOptions, options)
    if (options && check.isSelfDefinedAndValid(options.isFilename)) {
      sourceFilename = str
      if (!options.downloadFilename) {
        options.downloadFilename = sourceFilename
      }
    } else {
      content = str
    }
  }

  if (sourceFilename) {
    content = await fs.readFile(sourceFilename, options.readFileOptions)
  }

  if (check.isDefinedAndNotNull(options, 'downloadFilename')) {
    options.headers['Content-Disposition'] += `; filename="${options.downloadFilename}"`
  }
  options.headers['Content-Length'] = content.length
  response.bind(this)(options.statusCode, options.headers, content)
}

function html () {
  
}

function json () {

}

module.exports = {
  download,
  html,
  json
}
