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
  servers: [
    {
      port: 4001
    },
    {
      port: 4002,
      https: true,
      httpsOptions: {
        key: fs.readFileSync(path.join(__dirname, '../../config/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../../config/cert.pem'))
      }
    }
  ],
  publicFolder: path.join(__dirname, './public/'),
  middlewares
}

const cherry = new Cherry()
cherry.configure(routes, options)
cherry.start(options)
