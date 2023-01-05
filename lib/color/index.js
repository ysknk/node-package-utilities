export const reset = '\u001b[0m'

export const set = (code) => {
  return (str) => {
    return `\u001b[${code}${str}${reset}`
  }
}

export const colors = {
  red: set('31m'),
  magenta: set('35m'),
  cyan: set('36m'),
  blue: set('34m'),
  brightBlue: set('96m'),
  brightGreen: set('92m'),
  brightBlack: set('30;1m'),
}

