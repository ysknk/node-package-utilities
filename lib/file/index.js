import { promises as fs } from 'fs'
import { constants } from 'fs'

import * as message from '../message/index.js'

export const isAccess = async (dir) => {
  let result = false
  try {
    await fs.access(dir, constants.R_OK | constants.W_OK)
    result = true
  } catch (err) {
    message.failure(err)
  }
  return result
}

export const makeDir = async (dir, opts = { recursive: true }) => {
  await fs.mkdir(dir, opts, (err) => {
    message.failure(err)
  })
}
