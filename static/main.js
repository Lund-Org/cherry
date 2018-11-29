const fs = require('fs')
const path = require('path')
const routes = require('./routes')
const middlewares = require('./middlewares')
const cherry = require('../src/cherry')

const options = {
  onError: (req, res) => {
    res.writeHead(404)
    res.end('Error, the URL doesn\'t exist')
  },
  http: true,
  httpPort: 4001,
  https: true,
  httpsPort: 4002,
  httpsKeys: {
    key: fs.readFileSync(path.join(__dirname, '../config/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../config/cert.pem'))
  }
}

cherry.configure(routes, middlewares, options)
cherry.start(options)
