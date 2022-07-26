import * as time from '../time/index.js'
import * as color from '../color/index.js'

const colors = color.colors

export const begin = () => {
  time.initializeProcess()
  console.log(colors.blue('ℹ begin'))
}

// NOTE: finish => complete
export const finish = () => {
  console.log(
    colors.blue('ℹ finish'),
    `${time.getProcessTimeAll()}`
  )
  time.updateProcess()
}

// NOTE: end => incomplete
export const end = () => {
  console.log(
    colors.blue('ℹ end'),
    `${time.getProcessTimeAll()}`
  )
  time.updateProcess()
}

export const processing = (string) => {
  console.log(colors.blue('ℹ processing'), string)
}

export const success = (string, opts = {ptime: true}) => {
  const diffTime = opts.ptime && time.getDiffProcessTime()
  console.log(
    colors.brightGreen('✔ success'),
    opts.ptime ? `${string ? string + ' - ' : ''}${diffTime}` : ''
  )
  time.updateProcess()
}

export const failure = (string, opts = {ptime: true}) => {
  const diffTime = opts.ptime && time.getDiffProcessTime()
  console.log(
    colors.magenta('✘ failure'),
    opts.ptime ? `${string ? string + ' - ' : ''}${diffTime}` : ''
  )
  time.updateProcess()
}

