module.exports = {
  servers: [
    {
      port: 3000
    }
  ],
  routes: {
    router: [
      {
        type: 'ROUTE',
        method: ['GET'],
        path: '/',
        callback: (req, res) => {
          res.end('true')
        }
      }
    ]
  }
}
