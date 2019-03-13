const ORMException = require('./ORMException')
const {
  ORM_OPTIONS_ERROR,
  ORM_CONNECTION_ERROR,
  ORM_POST_CONNECTION_ERROR
} = require('./ORMException')

class ORMManager {
  /**
   * Constructor of the ORM Manager
   * Will be the abstraction of the orm operations
   */
  constructor () {
    this.options = {}
    this.plugin = null
  }

  /**
   * Register the plugin in the manager
   * @param {ORMPlugin} OrmPlugin Plugin for cherry of an orm
   */
  setPlugin (OrmPlugin) {
    this.plugin = new OrmPlugin()
  }

  /**
   * Ask to the plugin to check the options
   * @param {object} options The informations to connect to the database
   */
  checkOptions (options) {
    if (this.plugin) {
      try {
        this.plugin.checkOptions(options)
        this.options = options
      } catch (error) {
        throw new ORMException(error, ORM_OPTIONS_ERROR, options)
      }
    }
  }

  /**
   * Ask to the plugin to connect to the database
   */
  connectDatabase () {
    if (this.plugin) {
      try {
        this.plugin.connectDatabase()
      } catch (error) {
        throw new ORMException(error, ORM_CONNECTION_ERROR, this.options)
      }

      try {
        this.plugin.postConnectionProcess()
      } catch (error) {
        throw new ORMException(error, ORM_POST_CONNECTION_ERROR, this.options)
      }
    }
  }
}

module.exports = ORMManager
