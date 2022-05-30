export const reset = '\u001b[0m'

export const set = (code) => {
  return (str) => {
    return `\u001b[${code}m${str}${reset}`
  }
}

export const colors = {
  red: set('31'),
  magenta: set('35'),
  cyan: set('36'),
  blue: set('34'),
  brightBlue: set('96'),
  brightGreen: set('92')
}

