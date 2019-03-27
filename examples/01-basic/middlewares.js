module.exports = [
  {
    name: 'midOne',
    callback: (next, req, res) => {
      console.log('middleware one')
      return next.resolve(req, res)
    }
  },
  {
    name: 'midTwo',
    callback: (next, req, res) => {
      console.log('middleware two')
      return next.resolve(req, res)
    }
  },
  {
    name: 'midThree',
    callback: (next, req, res) => {
      console.log('middleware three')
      return next.resolve(req, res)
    }
  }
]
