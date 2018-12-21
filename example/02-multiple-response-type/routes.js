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
      return res.download(__dirname + '/routes.js', {
        isFilename: true,
        downloadFilename: 'routes-file.json'
      })
    }
  }
]
