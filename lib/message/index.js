import * as time from '../time/index.js'
import * as color from '../color/index.js'

const colors = color.colors

export const begin = () => {
  time.initializeProcess()
  // time.addProcessTimeAll(process.hrtime())
  console.log(colors.blue('begin'))
}

export const finish = () => {
  // const lastProcessTime = time.finishProcess()
  const lastProcessTime = time.updateProcess()
  // console.log('last', lastProcessTime)
  console.log(
    colors.blue('finish'),
    `${time.convertTime(lastProcessTime, 's').string}`
  )
}

export const success = (string) => {
  const lastProcessTime = time.updateProcess()
  // const diffFormatTime = time.getDiffFormatTime(lastProcessTime)

  console.log(
    colors.brightGreen('success'),
    `${string} - ${time.convertTime(lastProcessTime, 's').string}`
  )
}

export const failure = (string) => {
  const lastProcessTime = time.updateProcess()
  // const diffFormatTime = time.getDiffFormatTime(lastProcessTime)

  console.log(
    colors.magenta('failure'),
    `${string} - ${time.convertTime(lastProcessTime, 's').string}`
  )
}

