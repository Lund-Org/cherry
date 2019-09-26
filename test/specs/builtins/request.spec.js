/* eslint-disable no-unused-expressions */
const builtinsRequest = require(path.join(__root, './src/builtins/request'))

let shouldBeAnError = false
const fakeRequestObject = {
  url: 'http://localhost:3000/test',
  on (event, requestEventCallback) {
    if (event === 'data') {
      requestEventCallback(Buffer.from('{ "foo": "bar" }', 'utf8'))
    } else if (event === 'end' && !shouldBeAnError) {
      requestEventCallback()
    } else if (event === 'error' && shouldBeAnError) {
      requestEventCallback(1)
    }
  },
  getMethods: builtinsRequest.getMethods,
  defaultAggregateData: builtinsRequest.defaultAggregateData,
  defaultFinalizeRequest: builtinsRequest.defaultFinalizeRequest,
  defaultErrorManagement: builtinsRequest.defaultErrorManagement,
  boundDataToRequest: builtinsRequest.boundDataToRequest,
  cherry: {
    pluginConfigurator: {
      getPlugin: () => false
    }
  }
}

describe('request', () => {
  context('exported methods', () => {
    it('Tests the method getMethods', () => {
      expect(typeof fakeRequestObject.getMethods()).to.be.equal('object')
      expect(Object.keys(fakeRequestObject.getMethods()).length).to.be.equal(3)
    })
    it('Tests the method defaultAggregateData', () => {
      const testChunks = []

      fakeRequestObject.defaultAggregateData({}, testChunks, 1)
      fakeRequestObject.defaultAggregateData({}, testChunks, 2)

      expect(testChunks.length).to.be.equal(2)
    })
    it('Tests the method defaultFinalizeRequest', () => {
      expect(typeof fakeRequestObject.params).to.be.equal('undefined')
      fakeRequestObject.defaultFinalizeRequest({
        resolve: (request) => {
          expect(request).to.be.equal(fakeRequestObject)
        }
      }, [])
      expect(typeof fakeRequestObject.params).to.not.be.equal('undefined')
    })
    it('Tests the method defaultErrorManagement', () => {
      fakeRequestObject.defaultErrorManagement({
        reject: (error) => {
          expect(error).to.be.equal(12)
        }
      }, 12)
    })
    it('Tests the method boundDataToRequest', async () => {
      try {
        const dataValue = await fakeRequestObject.boundDataToRequest()
        expect(typeof dataValue.params).to.be.equal('object')
        expect(dataValue.params.foo).to.be.equal('bar')
      } catch (e) {
        expect.fail()
      }

      shouldBeAnError = true

      try {
        await fakeRequestObject.boundDataToRequest()
        expect.fail()
      } catch (e) {
        expect(e instanceof Error).to.be.true
      }
    })
  })
})
