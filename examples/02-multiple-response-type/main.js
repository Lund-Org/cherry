const routes = require('./routes')
const Cherry = require('../../src/cherry')
// const CherryHandlebarsConnector = require('@lund-org/cherry-handlebars-connector')
const CherryPugConnector = require('@lund-org/cherry-pug-connector')

const options = {
  servers: [
    {
      port: 4003
    }
  ],
  plugins: [
    // CherryHandlebarsConnector,
    CherryPugConnector
  ],
  routes
}

const cherry = new Cherry()
cherry.configure(options)
cherry.start(options)
