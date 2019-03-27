module.exports = {
  servers: [
    {
      port: 5000
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
