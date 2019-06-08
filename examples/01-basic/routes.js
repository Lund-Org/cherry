const path = require('path')

module.exports = {
  router: [
    {
      type: 'ROUTE',
      method: ['GET'],
      path: '/error-page',
      callback: (req, res) => {
        throw new Error('Simulate 500')
      }
    },
    {
      type: 'ROUTE',
      method: ['GET'],
      path: '/test-without-middlewares',
      callback: (req, res) => {
        res.end('<div>Seems ok</div>')
      }
    },
    {
      type: 'ROUTE',
      method: ['*'],
      path: '/test-with-middlewares',
      callback: (req, res) => {
        console.log('body :', req.body)
        console.log('route param :', req.routeParameters)
        console.log('params (get & post) :', req.params)
        console.log('route :', req._route)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('<div>ROOT page</div>')
      },
      middlewares: ['midOne', 'midThree']
    },
    {
      type: 'ROUTE',
      method: ['POST'],
      path: '/post',
      callback: (req, res) => {
        console.log('body :', req.body)
        console.log('route param :', req.routeParameters)
        console.log('params (get & post) :', req.params)
        console.log('route :', req._route)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end('<div>POST page</div>')
      },
      name: 'post-page'
    },
    {
      type: 'ROUTE',
      method: ['PUT'],
      path: '/put/:id/:toto',
      callback: (req, res) => {
        console.log('body :', req.body)
        console.log('route param :', req.routeParameters)
        console.log('params (get & post) :', req.params)
        console.log('route :', req._route)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end('<div>PUT page</div>')
      },
      rules: {
        id: /\d+/,
        toto: /[A-Za-z]+/
      }
    }
  ],
  publicRouter: [
    {
      type: 'PUBLIC_ROUTE_PUBLIC_FOLDER',
      path: path.join(__dirname, '/public')
    }
  ]
}
