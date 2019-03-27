const ORMException = require('./ORMException')
const {
  ORM_OPTIONS_ERROR,
  ORM_CONNECTION_ERROR,
  ORM_POST_CONNECTION_ERROR
} = require('./constants')
const {
  HOOK_BEFORE_START_ORM,
  HOOK_AFTER_START_ORM,
  HOOK_BEFORE_STOP_ORM,
  HOOK_AFTER_STOP_ORM
} = require('../hooks/constants')

class ORMManager {
  /**
   * Constructor of the ORM Manager
   * Will be the abstraction of the orm operations
   */
  constructor (cherryInstance) {
    this.options = {}
    this.plugin = null
    this.cherry = cherryInstance
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
  async connectDatabase () {
    if (this.plugin) {
      this.cherry.hookConfigurator.trigger(HOOK_BEFORE_START_ORM, {
        cherry: this.cherry,
        orm: this.plugin
      })
      try {
        await this.plugin.connectDatabase()
      } catch (error) {
        throw new ORMException(error, ORM_CONNECTION_ERROR, this.options)
      }

      try {
        this.plugin.postConnectionProcess()
      } catch (error) {
        throw new ORMException(error, ORM_POST_CONNECTION_ERROR, this.options)
      }
      this.cherry.hookConfigurator.trigger(HOOK_AFTER_START_ORM, {
        cherry: this.cherry,
        orm: this.plugin
      })
    }
  }

  /**
   * Ask to the plugin to connect to the database
   */
  async disconnectDatabase () {
    if (this.plugin && this.plugin.getConnection()) {
      this.cherry.hookConfigurator.trigger(HOOK_BEFORE_STOP_ORM, {
        cherry: this.cherry,
        orm: this.plugin
      })
      await this.plugin.closeConnection()
      this.plugin.closeConnection().then(() => {
        this.cherry.hookConfigurator.trigger(HOOK_AFTER_STOP_ORM, {
          cherry: this.cherry,
          orm: this.plugin
        })
      })
    }
  }

  /**
   * Retrieve the connection of the orm
   */
  getConnection () {
    return this.plugin.getConnection()
  }
}

module.exports = ORMManager
