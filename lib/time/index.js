export const convertHrtime = (hrtime) => {
  const ns = hrtime
  const number = Number(ns)
  const ms = number / 1000000
  const s = number / 1000000000
  return {
    s,
    ms,
    ns
  }
}

export const convertTime = (hrtime, unit, fixed = 3) => {
  const time = convertHrtime(hrtime)[unit]
  return {
    origin: time,
    fixed: time.toFixed(fixed),
    string: `${time.toFixed(fixed)}${unit}`
  }
}

let processTime = []

export const hrtime = () => {
  return process.hrtime.bigint()
}

export const getDiffProcessTime = () => {
  const diff = hrtime() - getLastProcessTime()
  const result = convertTime(diff, 's').string
  return result
}

export const getProcessTimeAll = () => {
  const diff = hrtime() - processTime[0]
  const result = convertTime(diff, 's').string
  return result
}

export const initializeProcessTime = () => {
  processTime = []
  processTime.push(hrtime())
}

export const initializeProcess = () => {
  initializeProcessTime()
}

export const getProcessTime = () => {
  return processTime
}

export const getLastProcessTime = () => {
  return processTime[processTime.length - 1]
}

export const updateProcess = () => {
  processTime.push(hrtime())
  return getLastProcessTime()
}
