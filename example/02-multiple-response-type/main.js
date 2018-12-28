const routes = require('./routes')
const cherry = require('../../src/cherry')

const options = {
  onError: (req, res, e) => {
    console.log(e)
    res.writeHead(404)
    res.end('An error occured')
  },
  httpPort: 4001
}

cherry.configure(routes, [], options)
cherry.start(options)
