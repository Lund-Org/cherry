/* eslint no-unused-expressions: 0 */
const CherryServerConfigurator = require(path.join(__root, './src/server/CherryServerConfigurator'))

let cherryServerConfigurator = null

describe('RouteMatchResponse', () => {
  before(() => {
    cherryServerConfigurator = new CherryServerConfigurator()
  })

  it('Tests the method buildConfiguration - port config', () => {
    expect(() => {
      cherryServerConfigurator.buildConfiguration({
        port: -1
      })
    }).to.throw()

    expect(() => {
      const config = cherryServerConfigurator.buildConfiguration({
        port: '4000'
      })
      expect(config.port).to.be.equal(4000)
    }).to.not.throw()

    expect(() => {
      const config = cherryServerConfigurator.buildConfiguration({})
      expect(config.port).to.be.equal(3000)
    }).to.not.throw()
  })

  it('Tests the method buildConfiguration - securityOptions config', () => {
    let config = cherryServerConfigurator.buildConfiguration({})
    expect(Object.keys(config.securityOptions).length).to.be.equal(4)

    config = cherryServerConfigurator.buildConfiguration({
      securityOptions: {
        'Access-Control-Allow-Origin': 'test'
      }
    })
    expect(config.securityOptions['Access-Control-Allow-Origin']).to.be.equal('test')
  })

  it('Tests the method buildConfiguration - https config', () => {
    let config = cherryServerConfigurator.buildConfiguration({})
    expect(Object.keys(config.httpsOptions).length).to.be.equal(0)

    config = cherryServerConfigurator.buildConfiguration({
      httpsOptions: {
        test: 1,
        foo: 'bar'
      }
    })
    expect(Object.keys(config.httpsOptions).length).to.be.equal(2)
  })

  it('Tests the method buildConfiguration - optionCallback config', () => {
    let config = cherryServerConfigurator.buildConfiguration({})
    expect(config.optionCallback).to.be.equal(null)

    config = cherryServerConfigurator.buildConfiguration({
      optionManagement: () => {
        return 1
      }
    })
    expect(() => {
      expect(config.optionCallback()).to.be.equal(1)
    }).to.not.throw()
  })
})
