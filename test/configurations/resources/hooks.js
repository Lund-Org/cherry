const hookTypes = require(path.join(__root, './src/hooks/constants'))

module.exports = [
  {
    name: 'hook1-beforeStartServer',
    type: hookTypes.HOOK_BEFORE_START_SERVER,
    method: (datas) => {
      describe('Hook event', () => {
        it(`Test the hook '${hookTypes.HOOK_BEFORE_START_SERVER}'`, (done) => {
          expect(typeof datas.cherry).to.not.be.equal('undefined')
          expect(typeof datas.server).to.not.be.equal('undefined')
          done()
        })
      })
    }
  },
  {
    name: 'hook2-afterStartServer',
    type: hookTypes.HOOK_AFTER_START_SERVER,
    method: (datas) => {
      describe('Hook event', () => {
        it(`Test the hook '${hookTypes.HOOK_AFTER_START_SERVER}'`, (done) => {
          expect(typeof datas.cherry).to.not.be.equal('undefined')
          expect(typeof datas.server).to.not.be.equal('undefined')
          done()
        })
      })
    }
  },
  {
    name: 'hook3-beforeStopServer',
    type: hookTypes.HOOK_BEFORE_STOP_SERVER,
    method: (datas) => {
      describe('Hook event', () => {
        it(`Test the hook '${hookTypes.HOOK_AFTER_START_SERVER}'`, (done) => {
          expect(typeof datas.cherry).to.not.be.equal('undefined')
          expect(typeof datas.server).to.not.be.equal('undefined')
          done()
        })
      })
    }
  },
  {
    name: 'hook4-afterStopServer',
    type: hookTypes.HOOK_AFTER_STOP_SERVER,
    method: (datas) => {
      describe('Hook event', () => {
        it(`Test the hook '${hookTypes.HOOK_AFTER_START_SERVER}'`, (done) => {
          expect(typeof datas.cherry).to.not.be.equal('undefined')
          expect(typeof datas.server).to.not.be.equal('undefined')
          done()
        })
      })
    }
  },
  {
    name: 'hook5-beforeStartServer',
    type: hookTypes.HOOK_BEFORE_START_ORM,
    method: (datas) => {
      describe('Hook event', () => {
        it(`Test the hook '${hookTypes.HOOK_BEFORE_START_ORM}'`, (done) => {
          expect(typeof datas.cherry).to.not.be.equal('undefined')
          expect(typeof datas.orm).to.not.be.equal('undefined')
          done()
        })
      })
    }
  },
  {
    name: 'hook6-afterStartServer',
    type: hookTypes.HOOK_AFTER_START_ORM,
    method: (datas) => {
      describe('Hook event', () => {
        it(`Test the hook '${hookTypes.HOOK_AFTER_START_ORM}'`, (done) => {
          expect(typeof datas.cherry).to.not.be.equal('undefined')
          expect(typeof datas.orm).to.not.be.equal('undefined')
          done()
        })
      })
    }
  },
  {
    name: 'hook7-beforeStopServer',
    type: hookTypes.HOOK_BEFORE_STOP_ORM,
    method: (datas) => {
      describe('Hook event', () => {
        it(`Test the hook '${hookTypes.HOOK_BEFORE_STOP_ORM}'`, (done) => {
          expect(typeof datas.cherry).to.not.be.equal('undefined')
          expect(typeof datas.orm).to.not.be.equal('undefined')
          done()
        })
      })
    }
  },
  {
    name: 'hook8-afterStopServer',
    type: hookTypes.HOOK_AFTER_STOP_ORM,
    method: (datas) => {
      describe('Hook event', () => {
        it(`Test the hook '${hookTypes.HOOK_AFTER_STOP_ORM}'`, (done) => {
          expect(typeof datas.cherry).to.not.be.equal('undefined')
          expect(typeof datas.orm).to.not.be.equal('undefined')
          done()
        })
      })
    }
  },
  {
    name: 'hook9-beforeProcess',
    type: hookTypes.HOOK_BEFORE_PROCESS,
    method: (datas) => {
      describe('Hook event', () => {
        it(`Test the hook '${hookTypes.HOOK_BEFORE_PROCESS}'`, (done) => {
          expect(typeof datas.request).to.not.be.equal('undefined')
          expect(typeof datas.response).to.not.be.equal('undefined')
          expect(typeof datas.middlewares).to.not.be.equal('undefined')
          done()
        })
      })
    }
  },
  {
    name: 'hook10-afterProcess',
    type: hookTypes.HOOK_AFTER_PROCESS,
    method: (datas) => {
      describe('Hook event', () => {
        it(`Test the hook '${hookTypes.HOOK_AFTER_PROCESS}'`, (done) => {
          expect(typeof datas.request).to.not.be.equal('undefined')
          expect(typeof datas.response).to.not.be.equal('undefined')
          expect(typeof datas.processResult).to.not.be.equal('undefined')
          done()
        })
      })
    }
  }
]
