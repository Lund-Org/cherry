const routes = require('./routes')
const cherry = require('../../src/cherry')

const options = {
  onError: (req, res) => {
    res.writeHead(404)
    res.end('Error, the URL doesn\'t exist')
  },
  httpPort: 4001
}

cherry.configure(routes, [], options)
cherry.start(options)
