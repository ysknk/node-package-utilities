import { promises as fs } from 'fs'
import { constants } from 'fs'

import * as message from '../message/index.js'

const baseOptions = {
  console: false,
  ptime: false
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
      message.failure(err, options)
    }
  })
}

export const remove = async (dir, dirOptions = { recursive: true }, options = baseOptions) => {
  await fs.rm(removepath, dirOptions, (err) => {
    if (options.console) {
      if (err) { throw message.failure(err, options) }
      utils.message.success(`${removepath} is deleted`, options)
    }
  })
}
