module.exports = [
  {
    name: 'midOne',
    callback: (next, req, res) => {
      console.log('middleware one')
      next.resolve(req, res)
    }
  },
  {
    name: 'midTwo',
    callback: (next, req, res) => {
      console.log('middleware two')
      next.resolve(req, res)
    }
  },
  {
    name: 'midThree',
    callback: (next, req, res) => {
      console.log('middleware three')
      next.resolve(req, res)
    }
  }
]
