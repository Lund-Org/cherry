const fs = require('fs')

const CherryHandlebarsConnector = require('@lund-org/cherry-handlebars-connector')
const CherryTypeormConnector = require('@lund-org/cherry-typeorm-connector')

const hooks = require('./hooks')
const middlewares = require('./middlewares')
const typeormConfig = require('./typeorm')

module.exports = {
  servers: [
    {
      port: 5001
    },
    {
      port: 5002,
      https: true,
      httpsOptions: {
        key: fs.readFileSync(path.join(__root, './test/configurations/key.pem')),
        cert: fs.readFileSync(path.join(__root, './test/configurations/cert.pem'))
      }
    }
  ],
  routes: {
    router: [
      {
        type: 'ROUTE_CONTEXT',
        name: 'test-context-',
        path: '/test',
        collection: [
          {
            type: 'ROUTE',
            method: ['GET'],
            path: '/simple-test/:id',
            middlewares: ['first-middleware-test', 'second-middleware-test'],
            callback: (req, res) => {
              res.json({ test: req.routeParameters.id })
              // to test the hook after process
              return true
            },
            rules: {
              id: /\d+/
            }
          }
        ]
      },
      {
        type: 'ROUTE',
        method: ['GET'],
        path: '/html-test',
        callback: async (req, res) => {
          await res.html(
            path.join(__root, 'test/configurations/resources/my-handlebar-view.html'),
            {
              parameters: {
                value: 'test'
              },
              viewEngine: 'utf8'
            }
          )
          return true
        }
      },
      {
        type: 'ROUTE',
        method: ['GET'],
        path: '/download-test',
        callback: async (req, res) => {
          await res.download(path.join(__root, 'test/configurations/resources/my-handlebar-view.html'), {
            isFilename: true,
            downloadFilename: 'test.html'
          })
          return true
        }
      }
    ],
    publicRouter: [
      {
        type: 'PUBLIC_ROUTE_PUBLIC_FOLDER',
        path: path.join(__root, '/test/configurations/fake_public')
      }
    ]
  },
  plugins: [CherryHandlebarsConnector, CherryTypeormConnector],
  database: typeormConfig,
  hooks,
  middlewares
}
