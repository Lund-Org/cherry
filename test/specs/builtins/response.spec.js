const builtinsResponse = require(path.join(__root, './src/builtins/response'))

let fakeResponseObject = {
  writeHead (code = 200, headers = {}) {
    expect(typeof code).to.be.equal('number')
    expect(typeof headers).to.be.equal('object')
  },
  end (content = '') {
    expect(typeof content).to.be.equal('string')
  },
  cherry: {
    pluginConfigurator: {
      getPlugin: () => {
        return null
      }
    }
  }
}
let bindedBuiltinResponse = {}
let privateBindedBuiltinResponse = {}

describe('response', () => {
  before(() => {
    for (const builtinIndex in builtinsResponse) {
      bindedBuiltinResponse[builtinIndex] = builtinsResponse[builtinIndex].bind(fakeResponseObject)
    }
    privateBindedBuiltinResponse['response'] = builtinsResponse['response'].bind(fakeResponseObject)
    privateBindedBuiltinResponse['defaultDownloadOptions'] = builtinsResponse['defaultDownloadOptions'].bind(fakeResponseObject)
    privateBindedBuiltinResponse['defaultHTMLOptions'] = builtinsResponse['defaultHTMLOptions'].bind(fakeResponseObject)
    privateBindedBuiltinResponse['defaultJSONOptions'] = builtinsResponse['defaultJSONOptions'].bind(fakeResponseObject)
  })

  context('exported methods', () => {
    it('Tests the method download', async () => {
      await bindedBuiltinResponse.download('download test', { isFilename: false })
    })
    it('Tests the method html', async () => {
      await bindedBuiltinResponse.html('<div>test</div>', { isRaw: true })
    })
    it('Tests the method json', async () => {
      await bindedBuiltinResponse.json('{ "foo": "bar" }')
      await bindedBuiltinResponse.json({ 'foo': 'bar' })
    })
    it('Tests the method redirect', async () => {
      await bindedBuiltinResponse.redirect('http://google.fr', 301)
    })
  })

  context('private methods', async () => {
    it('Tests the method response', () => {
      privateBindedBuiltinResponse.response(200, { testKey: 'test' }, 'content')
    })
    it('Tests the method defaultDownloadOptions', () => {
      expect(typeof privateBindedBuiltinResponse.defaultDownloadOptions()).to.be.equal('object')
    })
    it('Tests the method defaultHTMLOptions', () => {
      expect(typeof privateBindedBuiltinResponse.defaultHTMLOptions()).to.be.equal('object')
    })
    it('Tests the method defaultJSONOptions', () => {
      expect(typeof privateBindedBuiltinResponse.defaultJSONOptions()).to.be.equal('object')
    })
  })
})
