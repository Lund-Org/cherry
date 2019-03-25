const Hook = require('./Hook')
const DuplicateHookException = require('./DuplicateHookException')
const check = require('../helpers/check')

class HookManager {
  constructor () {
    this.hooks = {}
    this.allowDuplicatedHooks = false
  }

  /**
   * Set the option which allows or not the duplication
   * If true, it only warns
   * If false, it throws
   * @param {boolean} value The option value
   */
  setDuplicateHookOption (value) {
    this.allowDuplicatedHooks = value
  }

  /**
   * Add a hook to the list of hook order by type
   */
  addHook (newHook) {
    let _hook = newHook
    if (!(newHook instanceof Hook)) {
      _hook = new Hook(newHook)
    }
    if (!check.isDefined(this.hooks, _hook.getType())) {
      this.hooks[_hook.getType()] = []
    }

    for (let index in this.hooks) {
      this.hooks[index].forEach((hook) => {
        if (_hook.getName() === hook.getName()) {
          this._manageDuplicateHook(hook, _hook)
        }
      })
    }

    this.hooks[_hook.getType()].push(_hook)
  }

  /**
   * Executes the matching hooks based on a hook type
   * @param {EventEmitter} eventEmitter The eventEmitter to manage the multiple hooks
   */
  bindEventEmitter (eventEmitter) {
    this._sortByPriorities()

    for (let index in this.hooks) {
      // Bind the type of hooks
      eventEmitter.on(index, (data) => {
        this.hooks[index].some((hook) => {
          return hook.execute(data)
        })
      })
      // Bind the name of hook
      this.hooks[index].forEach((hook) => {
        eventEmitter.on(hook.getName(), hook.execute)
      })
    }
  }

  /**
   * Sort the hooks by priorities
   */
  _sortByPriorities () {
    for (let index in this.hooks) {
      this.hooks[index].sort((hookA, hookB) => {
        return hookA.getPriority() < hookB.getPriority()
      })
    }
  }

  /**
   * Warn or throw an exception because of a duplicate hook
   * @param {Hook} oldHook The hook previously registered
   * @param {Hook} newHook The new hook which is duplicated
   */
  _manageDuplicateHook (oldHook, newHook) {
    if (this.allowDuplicatedHooks) {
      console.warn(`The hook ${oldHook.getName()} has a duplicate hook (same name). The new Hook will be ignored`)
      console.warn(`The old hook was with the type '${oldHook.getType()}' and the new one is with the type '${newHook.getType()}'`)
    } else {
      throw new DuplicateHookException(oldHook.getName())
    }
  }
}

module.exports = HookManager
