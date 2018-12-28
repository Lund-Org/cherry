const jsonStringify = require('json-stringify-safe')
const check = require('../helpers/check')
const fs = require('../helpers/fs')

/**
 * The method to send the response quickly
 * @param {integer} code The HTTP code of the response
 * @param {object} headers The response headers
 * @param {string} content The content of the response
 */
function response (code, headers, content) {
  headers['Content-Length'] = content.length
  this.writeHead(code, headers)
  this.end(content)
}

/**
 * The default option for the download response
 * @return {Object}
 */
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

/**
 * The default option for the json response
 * @return {Object}
 */
function defaultJSONOptions () {
  return Object.freeze({
    headers: {
      'Content-Type': 'application/json'
    },
    serializer: null,
    indent: 2,
    statusCode: 200
  })
}

/**
 * A method to allow the download of files as response
 * @param {string} ref The path of the file to download or the content already in string
 * @param {object} refOptions The options of the response and the process
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

/**
 * Respond a json to the request
 * @param {object|string} ref The entity to stringify or the json already in string
 * @param {object} refOptions The options of the response and the process
 */
function json (ref, refOptions = null) {
  const options = Object.assign({}, defaultJSONOptions(), refOptions)
  let content = ref

  if (typeof ref !== 'string') {
    content = jsonStringify(ref, options.serializer, options.indent)
  }

  response.call(this, options.statusCode, options.headers, content)
}

module.exports = {
  download,
  html,
  json
}
