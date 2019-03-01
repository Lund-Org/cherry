class Configuration {
  constructor () {
    this.config = {}
  }

  setDefaultValue (config, defaultValues) {
    // loop on it
    // defaultValues should bring the validators methods
    // If value found in config and validate => set
    // If value found in config but wrong => exception
    // If no found, keep the default one
  }

  setConfig (config) {
    this.config = this.setDefaultValue(config)
  }
}

module.exports = Configuration
