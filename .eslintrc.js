module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'standard',
    'promise'
  ],
  env: {
    node: true,
    mocha: true
  },
  rules: {
    'arrow-parens': 0,
    'node/no-deprecated-api': 0
  },
  globals: {
    __root: true,
    path: true,
    assert: true,
    expect: true,
    should: true
  }
}
