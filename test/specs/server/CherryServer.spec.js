/* eslint no-unused-expressions: 0 */
const CherryServer = require(path.join(__root, './src/server/CherryServer'))
const DefaultErrorPageConfigurator = require(path.join(__root, './src/configuration/DefaultErrorPageConfigurator'))

let cherryServer = null
let checkPassThroughMethods = 0
let fakeResponse = {
  writeHead: () => {
    ++checkPassThroughMethods
  },
  end: () => {
    ++checkPassThroughMethods
  },
  boundOptions: () => {},
  setCherry: () => {}
}

describe('RouteMatchResponse', () => {
  before(() => {
    cherryServer = new CherryServer({
      dispatcher: {
        dispatch: () => {
          throw new Error('Test error case')
        }
      },
      defaultErrorPageConfigurator: new DefaultErrorPageConfigurator()
    })
    cherryServer.cherry.defaultErrorPageConfigurator.configure({
      defaultPages: {
        serverErrorPage: (req, res) => {
          throw new Error('Server error')
        }
      }
    })
  })

  it('Tests the method defaultOptionsManagement', () => {
    checkPassThroughMethods = 0
    cherryServer.options = {
      securityOptions: {
        'Access-Control-Allow-Methods': []
      }
    }
    expect(cherryServer.defaultOptionsManagement({ method: 'OPTIONS' }, fakeResponse)).to.be.false
    cherryServer.options.securityOptions['Access-Control-Allow-Methods'] = ['OPTIONS']
    expect(cherryServer.defaultOptionsManagement({ method: 'OPTIONS' }, fakeResponse)).to.be.true
    expect(checkPassThroughMethods).to.be.equal(2)
  })

  it('Tests the method bootstrap', () => {
    checkPassThroughMethods = 0
    cherryServer.options = {
      securityOptions: {
        'Access-Control-Allow-Methods': []
      },
      optionCallback: null
    }

    expect(() => {
      cherryServer.bootstrap({
        method: 'OPTIONS',
        setCherry: () => {}
      }, fakeResponse)
    }).to.throw()
  })
})
