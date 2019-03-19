/**
 * The abstraction of the Configuration classes
 */
class Configurator {
  constructor (manager) {
    this.manager = manager
  }

  /**
   * Configure the configurator, this method should be implemented
   */
  configure () {}
}

module.exports = Configurator
