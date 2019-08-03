const routes = require('./routes')
const hooks = require('./hooks')
const Cherry = require('../../src/cherry')

const options = {
  servers: [
    {
      port: 4004
    }
  ],
  hooks,
  routes
}

const cherry = new Cherry()
cherry.configure(options)
cherry.start(options)
