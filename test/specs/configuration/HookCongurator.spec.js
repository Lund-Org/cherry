const merge = require('deepmerge')
const HookConfigurator = require(path.join(__root, './src/configuration/HookConfigurator'))
const hooks = require(path.join(__root, './test/configurations/resources/hooks'))

let copyHooks = null
let hookConfigurator = null
let badHookConfigurator = null

describe('HookConfigurator', () => {
  before(() => {
    badHookConfigurator = new HookConfigurator()
    hookConfigurator = new HookConfigurator()
    copyHooks = hooks.map(hook => merge({}, hook))
    copyHooks.push({
      name: 'test-hook-name',
      type: 'test-hook-type',
      method: (value) => {
        describe('Hook event in HookConfigurator', () => {
          it('Test if the custom hook has been registered and can be triggered', (done) => {
            expect(value).to.not.be.equal(null)
            done()
          })
        })
      }
    })
  })

  it('Tests the method configure', () => {
    let typesFound = []

    hookConfigurator.configure({
      hooks: copyHooks,
      allowDuplicatedHooks: true
    })

    for (const copyHook of copyHooks) {
      if (!typesFound.includes(copyHook.type)) {
        typesFound.push(copyHook.type)
      }
    }

    expect(Object.keys(hookConfigurator.manager.hooks).length)
      .to.be.equal(typesFound.length)
    expect(hookConfigurator.manager.allowDuplicatedHooks).to.be.equal(true)

    expect(() => {
      badHookConfigurator.configure({
        hooks: 12
      })
    }).to.throw()
  })

  it('Tests the method trigger', () => {
    hookConfigurator.trigger('test-hook-type', 12)
  })
})
