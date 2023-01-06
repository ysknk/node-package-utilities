import path from 'path'

import { promises as fs } from 'fs'
import { constants } from 'fs'

import * as message from '../message/index.js'

const baseOptions = {
  console: false,
  ptime: false
}

export const isFile = (filename) => {
  return !!path.extname(filename)
}

export const isAccess = async (dir, options = baseOptions) => {
  let result = false
  try {
    await fs.access(dir, constants.R_OK | constants.W_OK)
    result = true
  } catch (err) {
    if (options.console) {
      message.failure(err, options)
    }
  }
  return result
}

export const makeDir = async (dir, dirOptions = { recursive: true }, options = baseOptions) => {
  await fs.mkdir(dir, dirOptions, (err) => {
    if (options.console) {
      if (err) { message.failure(err, options) }
    }
  })
}

export const remove = async (dir, dirOptions = { recursive: true }, options = baseOptions) => {
  await fs.rm(dir, dirOptions, (err) => {
    if (options.console) {
      if (err) { message.failure(err, options) }
      message.success(`${dir} is deleted`, options)
    }
  })
}

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const stat = async (filepath) => {
  const stat = await fs.stat(filepath)
  return stat
}

export const size = (stat) => {
  return formatBytes(stat.size)
}

export const stats = async (filepath) => {
  const stat = await fs.stat(filepath)
  return {
    stat,
    size: size(stat)
  }
}
