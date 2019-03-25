const CherryConfigurator = require('../abstract/CherryConfigurator')
const EventEmitter = require('events').EventEmitter
const HookManager = require('../hooks/HookManager')
const ConfiguratorException = require('./ConfiguratorException')
const check = require('../helpers/check')

/**
 * The configurator of the hooks
 * Inherits from the abstract CherryConfigurator
 */
class HookConfigurator extends CherryConfigurator {
  constructor () {
    super(new HookManager())

    this.eventEmitter = new EventEmitter()
  }

  /**
   * Configure multiple hooks and bind this to the event emitter
   * @param {Object} options The options set to the cherry instance
   */
  configure (options) {
    if (check.isDefined(options, 'allowDuplicatedHooks')) {
      this.manager.setDuplicateHookOption(!!options.allowDuplicatedHooks)
    }
    if (check.isDefined(options, 'hooks')) {
      if (Array.isArray(options.hooks)) {
        options.hooks.forEach((hook) => {
          this.manager.addHook(hook)
        })
        this.manager.bindEventEmitter(this.eventEmitter)
      } else {
        throw new ConfiguratorException('hooks', typeof options.hooks, 'Array')
      }
    }
  }

  /**
   * Trigger a hook type
   * @param {string} hookType The type of hook to trigger
   * @param {mixed} data The data sent to the hook(s)
   */
  trigger (hookType, data) {
    this.eventEmitter.emit(hookType, data)
  }
}

module.exports = HookConfigurator
