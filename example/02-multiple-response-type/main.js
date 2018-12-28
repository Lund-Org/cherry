const routes = require('./routes')
const Cherry = require('../../src/cherry')
const CherryHandlebarsConnector = require('@lund-org/cherry-handlebars-connector')

const options = {
  onError: (req, res, e) => {
    console.log(e)
    res.writeHead(404)
    res.end('An error occured')
  },
  httpPort: 4001
}

const cherry = new Cherry()
cherry.configure(routes, [], options)
cherry.registerPlugin(CherryHandlebarsConnector)
cherry.start(options)
