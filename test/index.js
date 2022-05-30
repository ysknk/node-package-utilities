import utils from '../index.js'

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

;(async () => {
  utils.message.begin()

  // a
  await sleep(500)
  utils.message.success('a')

  // b
  await sleep(500)
  utils.message.success('b')

  // c
  await sleep(500)
  utils.message.failure('c')

  utils.message.finish('test')
})()
