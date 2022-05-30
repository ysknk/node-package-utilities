import utils from '../index.js'

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

;(async () => {
  utils.message.begin()

  // a
  await sleep(300)
  utils.message.success('a')

  // b
  await sleep(300)
  utils.message.success('b')

  // c
  await sleep(300)
  utils.message.failure('c')

  utils.message.finish('test')
})()
