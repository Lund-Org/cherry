const CherryConfigurator = require(path.join(__root, './src/abstract/CherryConfigurator'))

let cherryConfigurator = null

describe('CherryConfigurator', () => {
  before(() => {
    cherryConfigurator = new CherryConfigurator({
      testMethod: (item) => {
        expect(item).to.not.be.equal(null)
      }
    })
  })

  it('Tests the method configure', () => {
    cherryConfigurator.configure({
      testKey: [1, 2, 3]
    }, 'testKey', 'testMethod', 'Array')

    expect(() => {
      cherryConfigurator.configure({
        testKey: 1
      }, 'testKey', 'testMethod', 'Array')
    }).to.throw()
  })
})
