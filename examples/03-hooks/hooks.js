const hookTypes = require('../../src/hooks/constants')

module.exports = [
  {
    name: 'hook1-beforeStart',
    priority: 1,
    type: hookTypes.HOOK_BEFORE_START_SERVER,
    method: (datas) => {
      console.log('First hook before the start of the http(s) server, here are the datas')
      console.log(datas)
    }
  },
  {
    name: 'hook2-afterStart',
    priority: 1,
    type: hookTypes.HOOK_AFTER_START_SERVER,
    method: (datas) => {
      console.log('Second hook after the start of the http(s) server, here are the datas')
      console.log(datas)
    }
  },
  {
    name: 'hook3-beforeProcess',
    priority: 1,
    type: hookTypes.HOOK_BEFORE_PROCESS,
    method: (datas) => {
      console.log('Third hook before the process of a route, here are the datas')
      console.log(datas)
    }
  },
  {
    name: 'hook4-afterProcess',
    // Priority commented to show what happens if it's missing
    // priority: 1,
    type: hookTypes.HOOK_AFTER_PROCESS,
    method: (datas) => {
      console.log('Fourth hook after the process of a route, here are the datas')
      console.log(datas)
    }
  },
  {
    name: 'hook5-afterProcess',
    priority: 42,
    type: hookTypes.HOOK_AFTER_PROCESS,
    method: (datas) => {
      console.log('Fifth hook after the process of a route, should be after the Hook 4 thanks to the priority, here are the datas')
      console.log(datas)
    }
  }
]
