const routes = require('./routes')
const hooks = require('./hooks')
const Cherry = require('../../src/cherry')

const options = {
  onError: (req, res, e) => {
    console.log(e)
    res.writeHead(404)
    res.end('An error occured')
  },
  servers: [
    {
      port: 4004
    }
  ],
  hooks
}

const cherry = new Cherry()
cherry.configure(routes, [], options)
cherry.start(options)
