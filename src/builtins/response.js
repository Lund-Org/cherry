const check = require('../helpers/check')
const fs = require('../helpers/fs')

function response (code, headers, content) {
  headers['Content-Length'] = content.length
  this.writeHead(code, headers)
  this.end(content)
}

function defaultDownloadOptions () {
  return Object.freeze({
    isFilename: true,
    sourceFilename: null,
    downloadFilename: null,
    headers: {
      'Content-Disposition': 'attachment'
    },
    readFileOptions: 'utf8',
    statusCode: 200
  })
}

function defaultJSONOptions () {
  return Object.freeze({
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: 200
  })
}

/**
 * A method to allow the download of files as response
 */
async function download (str, refOptions = null) {
  let content = ''
  const options = Object.assign({}, defaultDownloadOptions(), { sourceFilename: str }, refOptions)

  if (!refOptions) {
    options.downloadFilename = str
  } else if (check.isSelfDefinedAndValid(options.isFilename)) {
    if (!options.downloadFilename) {
      options.downloadFilename = options.sourceFilename
    }
  }

  if (check.isSelfDefinedAndValid(options.isFilename)) {
    content = await fs.readFile(options.sourceFilename, options.readFileOptions)
  } else {
    content = str
  }

  if (check.isDefinedAndNotNull(options, 'downloadFilename')) {
    options.headers['Content-Disposition'] += `; filename="${options.downloadFilename}"`
  }

  response.call(this, options.statusCode, options.headers, content)
}

function html () {
  
}

function json (ref, refOptions = null) {
  const options = Object.assign({}, defaultJsonOptions(), refOptions)
  let content = ref

  if (typeof ref !== 'string') {
    content = JSON.stringify(ref)
  }

  response.call(this, options.statusCode, options.headers, content)
}

module.exports = {
  download,
  html,
  json
}
