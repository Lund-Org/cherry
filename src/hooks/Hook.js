const check = require('../helpers/check')
const HookException = require('./HookException')

class Hook {
  constructor (hook) {
    if (!check.isDefined(hook, 'name') && typeof hook.name === 'string') {
      throw new HookException('name')
    }
    if (!check.isDefined(hook, 'method') && typeof hook.method === 'function') {
      throw new HookException('method')
    }
    if (!check.isDefined(hook, 'type') && typeof hook.type === 'string') {
      throw new HookException('type')
    }
    if (check.isDefined(hook, 'priority')) {
      this.priority = hook.priority
    } else {
      console.warn('Missing priority in the Hook, set to 1 by default')
      this.priority = 1
    }
    this.name = hook.name
    this.type = hook.type
    this.method = hook.method
  }

  /**
   * Retrieve the name of a hook
   * @return {string}
   */
  getName () {
    return this.name
  }

  /**
   * Retrieve the type of a hook
   * @return {string}
   */
  getType () {
    return this.type
  }

  /**
   * Retrieve the priority of a hook
   * @return {integer}
   */
  getPriority () {
    return this.priority
  }

  /**
   * Execute the process of the hook
   * @param {mixed} datas The data passed to the hook
   */
  execute (datas) {
    this.method(datas)
  }
}

module.exports = Hook
