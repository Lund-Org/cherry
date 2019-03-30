/* eslint no-unused-expressions: 0 */
const HookManager = require(path.join(__root, './src/hooks/HookManager'))
const EventEmitter = require('events').EventEmitter

let hookManager = null
let eventEmitter = new EventEmitter()

describe('HookManager', () => {
  before(() => {
    hookManager = new HookManager()
  })

  it('Tests the method setDuplicateHookOption', () => {
    hookManager.setDuplicateHookOption(true)
    expect(hookManager.allowDuplicatedHooks).to.be.equal(true)
  })

  it('Tests the method addHook', () => {
    // First hook added
    hookManager.addHook({
      name: 'test1',
      method: (datas) => {
        expect(datas).to.be.equal(1)
      },
      type: 'type-test'
    })

    // Second hook added
    expect(() => {
      hookManager.addHook({
        name: 'test2',
        method: (datas) => {
          expect(datas).to.be.equal(1)
        },
        type: 'type-test'
      })
    }).to.not.throw()

    expect(() => {
      // Duplicate Hook ignored
      hookManager.addHook({
        name: 'test2',
        method: (datas) => {
          expect(datas).to.be.equal(1)
        },
        type: 'type-test'
      })
    }).to.not.throw()

    hookManager.setDuplicateHookOption(false)
    // Duplicate which throw an error
    expect(() => {
      hookManager.addHook({
        name: 'test1',
        method: (datas) => {
          expect(datas).to.be.equal(1)
        },
        type: 'type-test'
      })
    }).to.throw()

    expect(Object.keys(hookManager.hooks).length).to.be.equal(1)
    expect(hookManager.hooks['type-test'].length).to.be.equal(2)
  })

  it('Tests the method bindEventEmitter', () => {
    hookManager.bindEventEmitter(eventEmitter)

    expect(eventEmitter.eventNames().length).to.be.equal(3)
  })
})
