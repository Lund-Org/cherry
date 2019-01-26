const path = require('path')

module.exports = [
  {
    method: ['GET'],
    path: '/download-string',
    callback: (req, res) => {
      return res.download('file content', {
        isFilename: false,
        downloadFilename: '02-multiple-response-type.txt'
      })
    }
  },
  {
    method: ['GET'],
    path: '/download-file',
    callback: (req, res) => {
      return res.download(path.join(__dirname, '/routes.js'), {
        isFilename: true,
        downloadFilename: 'routes-file.json'
      })
    }
  },
  {
    method: ['GET'],
    path: '/json-string',
    callback: (req, res) => {
      return res.json('{ "foo": "bar" }')
    }
  },
  {
    method: ['GET'],
    path: '/json-object',
    callback: (req, res) => {
      let obj = {
        key: 'value'
      }
      obj.circular = obj
      return res.json({
        foo: 'bar',
        ref: obj
      }, { indent: 4 })
    }
  },
  {
    method: ['GET'],
    path: '/html-raw',
    callback: (req, res) => {
      return res.html(
        '<div style="background: red; width: 500px; height: 500px;"></div>',
        { isRaw: true }
      )
    }
  },
  {
    method: ['GET'],
    name: 'html-from-file',
    path: '/html-file',
    callback: (req, res) => {
      return res.html(
        path.join(__dirname, '/my-handlebar-view.html'),
        {
          parameters: {
            cherryName: 'Cherry framework',
            routeName: req._route.name
          },
          viewEngine: 'utf8'
        }
      )
    }
  },
  {
    method: ['GET'],
    name: 'html-from-pug-file',
    path: '/html-pug-file',
    callback: (req, res) => {
      // If you want to test this route, update the main.js to load the right view engine.
      // Handlebars is used by default.
      return res.html(
        path.join(__dirname, '/my-pug-view.pug'),
        {
          parameters: {
            cherryName: 'Cherry framework',
            routeName: req._route.name
          },
          viewEngine: { pretty: true }
        }
      )
    }
  }
]
