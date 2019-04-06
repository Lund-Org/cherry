/* eslint no-unused-expressions: 0 */
const http = require('http')
const https = require('https')

const Cherry = require(path.join(__root, './src/cherry'))

const basicCherryConfig = require('../configurations/resources/basicCherryConfig')
const complexCherryConfig = require('../configurations/resources/complexCherryConfig')

let basicCherryInstance = null
let complexCherryInstance = null

/**
 * Method to request an url (to test the server)
 * @param {Object} module The module http or https to use
 * @param {string} url The url to request
 * @param {Funciton} callback The function to test if the payload is good
 */
async function request (module, url, callback) {
  return new Promise((resolve, reject) => {
    module.get(url, (resp) => {
      let data = ''
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        resolve(callback(data))
      })
    }).on('error', (err) => {
      expect(true).to.be.false
      reject(err)
    })
  })
}

describe('Cherry', () => {
  before(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
    basicCherryInstance = new Cherry()
    complexCherryInstance = new Cherry()
  })

  after(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1
  })

  context('The more basic configuration', () => {
    it('Test the configuration process of Cherry', () => {
      basicCherryInstance.configure(basicCherryConfig)

      expect(Array.isArray(basicCherryInstance.routeConfigurator.manager.routeManager.getRoutes())).to.be.true
    })

    it('Test if the configured server (with basic configuration) can start', async () => {
      await basicCherryInstance.start()
      expect(basicCherryInstance.cherryServerManager.servers.length).to.be.equal(1)
      expect(basicCherryInstance.cherryServerManager.servers[0].server.listening).to.be.true
    })

    it('Test to request the server', function (done) {
      this.timeout(5000)
      request(http, 'http://localhost:3000', (payload) => {
        expect(payload).to.be.equal('true')
      }).then(() => {
        done()
      })
    })

    it('Test if the configured server (with basic configuration) can stop', async function () {
      this.timeout(5000)
      await basicCherryInstance.stop()
      expect(basicCherryInstance.cherryServerManager.servers[0].server.listening).to.be.false
    })
  })

  context('A complex configuration', () => {
    it('Test the configuration process of Cherry', () => {
      complexCherryInstance.configure(complexCherryConfig)

      expect(Array.isArray(complexCherryInstance.routeConfigurator.manager.routeManager.getRoutes())).to.be.true
    })

    it('Test if the configured server (with complex configuration) can start', async () => {
      await complexCherryInstance.start()
      expect(complexCherryInstance.cherryServerManager.servers.length).to.be.equal(2)
      expect(complexCherryInstance.cherryServerManager.servers[0].server.listening).to.be.true
    })

    it('Test to request the http server', () => {
      return request(http, 'http://localhost:3001/test/simple-test/9', (payload) => {
        const decodedResponse = JSON.parse(payload)
        expect(decodedResponse.test).to.be.equal('9')
      })
    })
    it('Test to request the https server', () => {
      return request(https, 'https://localhost:3002/test/simple-test/99', (payload) => {
        const decodedResponse = JSON.parse(payload)
        expect(decodedResponse.test).to.be.equal('99')
      })
    })
    it('Test to request the server to hit the public folder', () => {
      return request(http, 'http://localhost:3001/test.json', (payload) => {
        const decodedResponse = JSON.parse(payload)
        expect(decodedResponse.test).to.be.true
      })
    })
    it('Test to request the server to use the view renderer', () => {
      return request(http, 'http://localhost:3001/html-test', (payload) => {
        expect(payload.trim()).to.be.equal('<div>test</div>')
      })
    })
    it('Test to request the server to use the downloader', () => {
      return request(http, 'http://localhost:3001/download-test', (payload) => {
        expect(payload.trim()).to.be.equal('<div>{{ value }}</div>')
      })
    })

    it('Test if the configured server (with complex configuration) can stop', async function () {
      this.timeout(5000)
      await complexCherryInstance.stop()
      expect(complexCherryInstance.cherryServerManager.servers[0].server.listening).to.be.false
    })
  })
})
