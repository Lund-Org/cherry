const fs = require('fs')
const path = require('path')
const routes = require('./routes')
const middlewares = require('./middlewares')
const Cherry = require('../../src/cherry')

const options = {
  onError: (req, res, e) => {
    console.log(e)
    res.writeHead(404)
    res.end('An error occured')
  },
  httpPort: 4001,
  // httpsPort: 4002,
  // httpsKeys: {
  //   key: fs.readFileSync(path.join(__dirname, '../../config/key.pem')),
  //   cert: fs.readFileSync(path.join(__dirname, '../../config/cert.pem'))
  // },
  publicFolder: path.join(__dirname, './public/')
}

const cherry = new Cherry()
cherry.configure(routes, middlewares, options)
cherry.start(options)
