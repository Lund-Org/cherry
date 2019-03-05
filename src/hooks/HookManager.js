const Hook = require('./Hook')

class HookManager {
  constructor () {
    this.hooks = []
  }

  /**
   * Sort the hooks by priorities
   */
  addHook (hook) {
    let _hook = hook
    if (!(hook instanceof Hook)) {
      _hook = new Hook(hook)
    }
    this.hooks.push(_hook)
  }

  /**
   * Sort the hooks by priorities
   */
  sortByPriorities () {
    this.hooks.sort((hookA, hookB) => {
      return hookA.getPriority() < hookB.getPriority()
    })
  }

  /**
   * Executes the matching hooks based on a hook type
   * @param {string} hookType The type of hook we want to resolve
   * @param {mixed} datas The data passed to the hook
   */
  resolve (hookType, datas) {
    this.hooks.forEach((hook) => {
      if (hook.getType() === hookType) {
        hook.execute(datas)
      }
    })
  }
}

module.exports = HookManager
