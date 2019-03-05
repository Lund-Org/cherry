const routes = require('./routes')
const hooks = require('./hooks')
const Cherry = require('../../src/cherry')

const options = {
  onError: (req, res, e) => {
    console.log(e)
    res.writeHead(404)
    res.end('An error occured')
  },
  httpPort: 4004
}

const cherry = new Cherry()
cherry.configure(routes, [], hooks, options)
cherry.start(options)
