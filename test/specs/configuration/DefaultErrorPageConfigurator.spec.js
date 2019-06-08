const DefaultErrorPageConfigurator = require(path.join(__root, './src/configuration/DefaultErrorPageConfigurator'))

const default404 = () => {
  return 404
}
let defaultErrorPageConfigurator = null
let customDefaultErrorPageConfigurator = null
const fakeResponse = {
  errorCode: 0,
  html: function (path, options) {
    this.errorCode = options.statusCode
  }
}

describe('DefaultErrorPageConfigurator', () => {
  before(() => {
    defaultErrorPageConfigurator = new DefaultErrorPageConfigurator()
    customDefaultErrorPageConfigurator = new DefaultErrorPageConfigurator()
  })

  it('Tests the method configure', () => {
    customDefaultErrorPageConfigurator.configure({
      defaultPages: {
        clientErrorPage: default404
      }
    })
  })

  it('Tests the method clientErrorPage', () => {
    defaultErrorPageConfigurator.manager.clientErrorPage({}, fakeResponse)
    expect(fakeResponse.errorCode).to.be.equal(404)
    expect(customDefaultErrorPageConfigurator.manager.clientErrorPage({}, fakeResponse)).to.be.equal(404)
  })

  it('Tests the method serverErrorPage', () => {
    defaultErrorPageConfigurator.manager.serverErrorPage({}, fakeResponse)
    expect(fakeResponse.errorCode).to.be.equal(500)
  })
})
