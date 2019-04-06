const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

let rawdata = fs.readFileSync(path.join(__dirname, '../package.json'))
let packageJson = JSON.parse(rawdata)

if (typeof packageJson['build-config'] !== 'undefined' && typeof packageJson['build-config'].exportAliases !== 'undefined') {
  for (let filename in packageJson['build-config'].exportAliases) {
    exec(`cp -rf ${path.join(__dirname, '../', packageJson['build-config'].exportAliases[filename])} ${path.join(__dirname, '../', filename)}`)
  }
}
