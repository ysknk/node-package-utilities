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
  let parentVal = {}

  let split = file
    .replace(/(\.)+\//g, '/')
    .split(/(?=\/)/g)

  split[split.length - 1] = split[split.length - 1]
    .replace(/^\//, mark.file)
    .replace(ext, '')

  const setValue = (base) => {
    const regexp = new RegExp(`^[${mark.dir}|${mark.file}]`)
    for (const key in base) {
      if (!key.match(regexp)) {
        parentVal[key] = base[key]
      }
    }
  }
  setValue(options)

  split.forEach((name, i) => {
    const targetConfig = (currentVal && currentVal[name])
    const baseConfig = options[name]
    const data = targetConfig || baseConfig
    setValue(data)
    if (data || parentVal) {
      currentVal = Object.assign({}, parentVal, data)
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
    '.cjs',
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

  const isJS = filepath && filepath.match(/\.(c|m)?(t|j)sx?$/)
  const configFile = isJS && await import(filepath)

  return (configFile && configFile.default)
    || (filepath ? JSON.parse(fs.readFileSync(filepath)) : {})
}
