import { findUp } from 'find-up'

// {
//   '/dir': {
//     '$file': {}
//   }
// }
export const fromPath = (file, ext, options) => {
  if (!options) { return }

  const mark = {
    dir: '\/',
    file: '\$'
  }

  let currentVal = null
  let parentVal = null

  let split = file
    .replace(/(\.)+\//g, '/')
    .split(/(?=\/)/g)

  split[split.length - 1] = split[split.length - 1]
    .replace(/^\//, mark.file)
    .replace(ext, '')

  const setValue = (base) => {
    for (const key in base) {
      const regexp = new RegExp(`^[${mark.dir}|${mark.file}]`)
      if (key.match(regexp)) { return }
      if (!parentVal) { parentVal = {} }
      parentVal[key] = base[key]
    }
  }
  setValue(options)

  split.forEach((name, i) => {
    const targetConfig = (currentVal && currentVal[name])
    const baseConfig = options[name] || options
    const data = targetConfig || baseConfig
    setValue(data)
    if (data || parentVal) {
      currentVal = Object.assign({}, parentVal, data)
    } else {
      currentVal = baseConfig
    }
  })
  return currentVal
}

export async function fromConfig (packageName, opts = {
  prefix: '.',
  suffix: 'rc',
  extentions: [
    '',
    '.mjs',
    '.js',
    '.json',
    // '.jsonc',//TODO: add parser
    // '.json5',//TODO: add parser
    '.ts'
  ]
}) {
  const name = `${opts.prefix}${packageName}${opts.suffix}`
  const files = opts.extentions.map((extention) => {
    return `${name}${extention}`
  })
  const filepath = await findUp(files)

  const isJS = filepath && filepath.match(/\.m?(t|j)sx?$/)
  const configFile = isJS && await import(filepath)

  return (configFile && configFile.default)
    || (filepath ? JSON.parse(fs.readFileSync(filepath)) : {})
}
