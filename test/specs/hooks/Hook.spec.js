/* eslint no-unused-expressions: 0 */
const Hook = require(path.join(__root, './src/hooks/Hook'))

let hook = null
const hookConfig = {
  name: 'test1',
  method: (datas) => {
    expect(datas).to.be.equal(1)
  },
  type: 'type-test'
}

describe('Hook', () => {
  it('Tests the configuration of the object in the constructor', () => {
    expect(() => {
      hook = new Hook({ withoutName: 'Hi' })
    }).to.throw()
    expect(() => {
      hook = new Hook({ name: ['not a string'] })
    }).to.throw()
    expect(() => {
      hook = new Hook({ name: 'greatName' })
    }).to.throw()
    expect(() => {
      hook = new Hook({ name: 'greatName', method: 'not a function' })
    }).to.throw()
    expect(() => {
      hook = new Hook({ name: 'greatName', method: () => {} })
    }).to.throw()
    expect(() => {
      hook = new Hook({ name: 'greatName', method: () => {}, type: ['not-a-string'] })
    }).to.throw()

    hook = new Hook(hookConfig)
  })

  it('Tests the method getName', () => {
    expect(hook.getName()).to.be.equal(hookConfig.name)
  })

  it('Tests the method getType', () => {
    expect(hook.getType()).to.be.equal(hookConfig.type)
  })

  it('Tests the method getPriority', () => {
    expect(hook.getPriority()).to.be.equal(1)
  })

  it('Tests the method execute', () => {
    hook.execute(1)
  })
})
