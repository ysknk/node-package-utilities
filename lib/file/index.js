import { promises as fs } from 'fs'
import { constants } from 'fs'

import * as message from '../message/index.js'

export const isAccess = async (dir, options = {ptime: false}) => {
  // let result = false
  try {
    await fs.access(dir, constants.R_OK | constants.W_OK)
    // result = true
  } catch (err) {
    // message.failure(err, options)
    // result = err
  }
  // return result
}

export const makeDir = async (dir, dirOptions = { recursive: true }, options = {ptime: false}) => {
  // let result = false
  await fs.mkdir(dir, dirOptions, (err) => {
    // message.failure(err, options)
    // result = err
  })
  // return err
}
