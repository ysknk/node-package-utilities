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
  try {
    await fs.access(dir, constants.R_OK | constants.W_OK)
  } catch (err) {
    if (options.console) {
      message.failure(err, options)
    }
  }
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
