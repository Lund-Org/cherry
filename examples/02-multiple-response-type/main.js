const routes = require('./routes')
const Cherry = require('../../src/cherry')
const CherryHandlebarsConnector = require('@lund-org/cherry-handlebars-connector')
const CherryPugConnector = require('@lund-org/cherry-pug-connector')

const options = {
  onError: (req, res, e) => {
    console.log(e)
    res.writeHead(404)
    res.end('An error occured')
  },
  servers: [
    {
      port: 4003
    }
  ],
  plugins: [ CherryHandlebarsConnector, CherryPugConnector ]
}

const cherry = new Cherry()
cherry.configure(routes, options)
cherry.start(options)
