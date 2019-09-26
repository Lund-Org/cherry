/* eslint no-unused-expressions: 0 */
const ORMManager = require(path.join(__root, './src/orm/ORMManager'))

let ormManager = null
const fakeCherry = {
  hookConfigurator: {
    trigger: () => {}
  }
}

/**
 * Simulation class of an ORM plugin
 */
class Test {
  constructor () {
    this.connectTry = 0
    this.postProcessTry = 0
    this.passInCloseConnectionMethod = false
  }

  checkOptions (options) {
    if (typeof options === 'object') {
      return options
    } else {
      throw new Error('To cover the catch of the orm manager method')
    }
  }

  async connectDatabase () {
    return new Promise((resolve, reject) => {
      ++this.connectTry
      if (this.connectTry % 2 === 1) {
        resolve(1)
      } else {
        reject(new Error('Simulate an error'))
      }
    })
  }

  async closeConnection () {
    this.passInCloseConnectionMethod = true
  }

  postConnectionProcess () {
    ++this.postProcessTry
    if (this.postProcessTry % 2 === 1) {
      return 1
    } else {
      throw new Error('Simulate an error')
    }
  }

  getConnection () {
    return true
  }
}

describe('ORMManager', () => {
  before(() => {
    ormManager = new ORMManager(fakeCherry)
  })

  it('Tests the method setPlugin', () => {
    ormManager.setPlugin(Test)
    expect(ormManager.plugin).to.not.be.equal(null)
  })

  it('Tests the method checkOptions', () => {
    ormManager.checkOptions({})
    expect(ormManager.plugin).to.not.be.equal(null)
    expect(() => {
      ormManager.checkOptions(true)
    }).to.throw()
  })

  it('Tests the method connectDatabase', async () => {
    // Test if the method works
    try {
      await ormManager.connectDatabase()
      expect(true).to.be.true
    } catch (e) {
      expect.fail()
    }
    // Test when connectDatabase throw something
    try {
      await ormManager.connectDatabase()
      expect.fail()
    } catch (e) {
      expect(true).to.be.true
    }
    // Test when postConnectionProcess throw something
    try {
      await ormManager.connectDatabase()
      expect.fail()
    } catch (e) {
      expect(true).to.be.true
    }
    expect(ormManager.connectTry).to.not.be.equal(0)
    expect(ormManager.postProcessTry).to.not.be.equal(0)
  })

  it('Tests the method disconnectDatabase', async () => {
    await ormManager.disconnectDatabase()
    expect(ormManager.plugin.passInCloseConnectionMethod).to.be.true
  })

  it('Tests the method getConnection', () => {
    expect(ormManager.getConnection()).to.be.true
  })
})
