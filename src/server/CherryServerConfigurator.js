const check = require('../helpers/check')

const DEFAULT_PORT = 3000

class CherryServerConfigurator {
  /**
   * Check the options, provides default values, throw errors on invalid data
   * @param {Object} options The options provided to configure the server
   * @return {Object}
   */
  buildConfiguration (options) {
    return {
      port: this.getServerPort(options),
      securityOptions: this.buildSecurityOptions(options),
      httpsOptions: Object.assign({}, options.httpsOptions),
      errorCallback: this.getErrorCallbackFromOptions(options),
      optionCallback: this.getOptionCallbackFromOptions(options)
    }
  }

  /**
   * Check the security options, provides default values, throw errors on invalid data
   * @param {Object} options The options provided to configure the server
   * @return {Object}
   */
  getServerPort (options) {
    if (check.isDefined(options, 'port')) {
      let port = options.port

      if (typeof port === 'string') {
        port = parseInt(port)
      }
      if (typeof port === 'number' && (port < 0 || !Number.isInteger(port))) {
        throw new Error(`The port '${port}' is invalid`)
      }

      return port
    } else {
      return DEFAULT_PORT
    }
  }

  /**
   * Check the security options, provides default values, throw errors on invalid data
   * @param {Object} options The options provided to configure the server
   * @return {Object}
   */
  buildSecurityOptions (options) {
    let buildOptions = {}
    const hasSecOpt = check.isDefined(options, 'securityOptions')

    if (!hasSecOpt || !check.isDefined(options.securityOptions, 'Access-Control-Allow-Origin')) {
      buildOptions['Access-Control-Allow-Origin'] = '*'
    }
    if (!hasSecOpt || !check.isDefined(options.securityOptions, 'Access-Control-Request-Method')) {
      buildOptions['Access-Control-Request-Method'] = '*'
    }
    if (!hasSecOpt || !check.isDefined(options.securityOptions, 'Access-Control-Allow-Methods')) {
      buildOptions['Access-Control-Allow-Methods'] = 'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    }
    if (!hasSecOpt || !check.isDefined(options.securityOptions, 'Access-Control-Allow-Headers')) {
      buildOptions['Access-Control-Allow-Headers'] = '*'
    }

    return buildOptions
  }

  /**
   * Check the security options, provides default values, throw errors on invalid data
   * @param {Object} options The options provided to configure the server
   * @return {Object}
   */
  getErrorCallbackFromOptions (options) {
    if (check.isDefined(options, 'onError') && typeof options.onError === 'function') {
      return options.onError
    } else {
      return null
    }
  }

  /**
   * Check if an option callback has been defined and use it
   * If it's a function, it will execute it
   * If it's another value than null, it will check in the routes (so you can manage the option request route by route)
   * If it's null or undefined, the default behaviour will be used
   * @param {Object} options The options provided to configure the server
   * @return {mixed}
   */
  getOptionCallbackFromOptions (options) {
    if (check.isDefined(options, 'optionManagement') && options.optionManagement !== null) {
      return options.optionManagement
    } else {
      return null
    }
  }
}

module.exports = CherryServerConfigurator
