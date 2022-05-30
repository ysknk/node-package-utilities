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
  const time = hrtime[1] ? convertHrtime(hrtime[1])[unit] : hrtime
  // TODO: 1s以上かかる場合
  // console.log('convertTime:', time, 'hrtime:', hrtime)
  return {
    origin: time,
    fixed: time.toFixed(fixed),
    string: `${time.toFixed(fixed)}${unit}`
  }
}

let processTime = []
let formatProcessTime = []

let processTimeAll = []

export const initializeProcessTime = () => {
  processTime = []
  formatProcessTime = []
}
export const initializeProcessTimeAll = () => {
  processTimeAll = []
}

export const initializeProcess = () => {
  initializeProcessTime()
  initializeProcessTimeAll()
}

export const getProcessTime = () => {
  return processTime
}

export const getFormatProcessTime = () => {
  return formatProcessTime
}

// export const getDiffFormatTime = (lastProcessTime) => {
//   const convTime = convertTime(lastProcessTime, 's')
//   addFormatProcessTime(convTime.origin)
//
//   const formatProcessTime = getFormatProcessTime()
//
//   const brforeProcessTime = formatProcessTime[formatProcessTime.length - 2]
//   const currentProcessTime = formatProcessTime[formatProcessTime.length - 1]
//
//   // console.log(1, brforeProcessTime)
//   return brforeProcessTime
//     ? Math.max(currentProcessTime, brforeProcessTime) - Math.min(currentProcessTime, brforeProcessTime)
//     : currentProcessTime
// }

// export const addFormatProcessTime = (time) => {
//   formatProcessTime.push(time)
// }

// export const addProcessTimeAll = (time) => {
//   processTimeAll.push(time)
// }

export const getProcessTimeAll = () => {
  return processTimeAll
}

export const updateProcess = () => {
  // console.log('update:', process.hrtime.bigint().toString().match(/^[0-9]*$/)[0])
  // const hrtime = process.hrtime.bigint().toString().match(/^[0-9]*$/)[0]
  const hrtime = process.hrtime()
  processTime.push(hrtime)
  return processTime[processTime.length - 1]
}

// export const updateProcess = () => {
//   const time = process.hrtime(processTime[processTime.length - 1])
//   processTime.push(process.hrtime.())
//   return time
// }
//
// export const finishProcess = () => {
//   processTime.push(process.hrtime())
//   return processTime[processTime.length - 1]
//   // processTimeAll.push(process.hrtime())
//   // return processTimeAll[processTimeAll.length - 1]
// }

// export const finishProcess = () => {
//   processTimeAll.push(process.hrtime())
//   return processTimeAll[processTimeAll.length - 1]
// }
