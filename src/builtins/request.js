const url = require('url')
const querystring = require('querystring')

/**
 * Get the methods of the plugin or the default one
 * @return {Object} An object of the process to execute on data received, end of the request or error (Format = { onData, onEnd, onError })
 */
function getMethods () {
  let reqEngine = {}

  if (this.cherry.pluginConfigurator.getPlugin('RequestEngine')) {
    reqEngine = this.cherry.pluginConfigurator.getPluginInstance('RequestEngine')
  }

  return {
    onData: (typeof reqEngine.aggregateData === 'function') ? reqEngine.aggregateData : this.defaultAggregateData,
    onEnd: (typeof reqEngine.finalizeRequest === 'function') ? reqEngine.finalizeRequest : this.defaultFinalizeRequest,
    onError: (typeof reqEngine.errorManagement === 'function') ? reqEngine.errorManagement : this.defaultErrorManagement
  }
}

/**
 * The default method to aggregate the chunks one by one
 * @param {Object} promiseCallbacks An object of the promise callbacks
 * @param {Array} chunks The chunk stack of the body parts
 * @param {Buffer} data The data chunk
 */
function defaultAggregateData (promiseCallbacks, chunks, data) {
  chunks.push(data)
}

/**
 * The default method to process the request received with its datas
 * @param {Object} promiseCallbacks An object of the promise callbacks
 * @param {Array} chunks The chunk stack of the body parts
 */
function defaultFinalizeRequest (promiseCallbacks, chunks) {
  const parsedUrl = url.parse(this.url, true)
  this.bodyBuffer = Buffer.concat(chunks)
  this.body = this.bodyBuffer.toString()
  let post = {}

  try {
    post = JSON.parse(this.body)
  } catch (e) {
    post = querystring.parse(this.body)
  }
  this.params = { ...parsedUrl.query, ...post }
  promiseCallbacks.resolve(this)
}

/**
 * The default method to handle an error during the process of the request
 * @param {Object} promiseCallbacks An object of the promise callbacks
 * @param {Object} error The error which occured during the process of the request
 */
function defaultErrorManagement (promiseCallbacks, error) {
  promiseCallbacks.reject(error)
}

/**
 * Get the body of the request and build it to use it with a friendly way
 * @return {Promise} The body data of the request
 */
async function boundDataToRequest () {
  const methods = this.getMethods()

  return new Promise((resolve, reject) => {
    const chunks = []

    this.on('data', (data) => {
      methods.onData.call(this, { resolve, reject }, chunks, data)
    })
    this.on('end', () => {
      methods.onEnd.call(this, { resolve, reject }, chunks)
    })
    this.on('error', (err) => {
      methods.onEnd.call(this, { resolve, reject }, err)
    })
  })
}

module.exports = {
  getMethods,
  defaultAggregateData,
  defaultFinalizeRequest,
  defaultErrorManagement,
  boundDataToRequest
}
