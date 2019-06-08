module.exports = [
  {
    matchUrl: /\/test\/(.*)/,
    targetUrl: '/test-with-middlewares?old_path=$1',
    statusCode: 301
  }
]
