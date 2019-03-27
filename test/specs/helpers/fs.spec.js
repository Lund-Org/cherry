const fs = require(path.join(__root, './src/helpers/fs'))

describe('fs', () => {
  it('Tests the method readFile', async () => {
    const resultOfReadFile = fs.readFile(path.join(__root, './test/configurations/fake_public/test.json'))
    expect(resultOfReadFile).to.be.a('promise')

    const fileContent = await resultOfReadFile
    expect(fileContent.toString().trim()).to.be.equal('{"test": true}')

    /* Fail test */
    fs.readFile(path.join(__root, './test/configurations/fake_public/not_found.js')).then((content) => {
      expect(content).to.be.equal('This should not work')
    }).catch((err) => {
      expect(err).to.be.a('error')
    })
  })
})
