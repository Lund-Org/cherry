const path = require('path')
const { assert, expect, should } = require('chai')

process.env.NODE_ENV = 'test'
global.__root = path.resolve(__dirname, '../')
global.path = path
global.assert = assert
global.expect = expect
global.should = should
