const fs = require('fs')

/**
 * Read a file but use the promises instead of the usual callback
 * @param {string} path The path to the file
 * @param {object|string} options The options for the file opening
 * @return {Promise<Buffer>}
 */
async function readFile (path, options = {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = {
  readFile
}
