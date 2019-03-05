module.exports = [
  {
    method: ['GET'],
    path: '/',
    callback: (req, res) => {
      console.log('body :', req.body)
      console.log('route param :', req.routeParameters)
      console.log('route :', req._route)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end('<div>ROOT page</div>')
    },
    middlewares: [ 'midOne', 'midThree' ]
  },
  {
    method: ['POST'],
    path: '/post',
    callback: (req, res) => {
      console.log('body :', req.body)
      console.log('route param :', req.routeParameters)
      console.log('route :', req._route)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end('<div>POST page</div>')
    },
    name: 'post-page'
  },
  {
    method: ['PUT'],
    path: '/put/:id/:toto',
    callback: (req, res) => {
      console.log('body :', req.body)
      console.log('route param :', req.routeParameters)
      console.log('route :', req._route)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end('<div>PUT page</div>')
    },
    rules: {
      id: /\d+/,
      toto: /[A-Z]+/
    }
  }
]
