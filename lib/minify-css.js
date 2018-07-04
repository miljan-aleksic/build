import fs from 'fs'
import path from 'path'
import CleanCSS from 'clean-css'
import read from './read'
import write from './write'

export default async function ({ src, dest, options = {} }) {
  dest = dest || src
  const code = fs.existsSync(src)
    ? await read(src)
    : src

  // set sourceMap
  const sourceMap = options.sourceMap !== undefined
    ? { url: options.sourceMap.url || `${path.basename(dest)}.map` }
    : false

  const output = await new CleanCSS({
    ...options,
    sourceMap,
    rebase: false,
    returnPromise: true
  }).minify(code)

  if (output.error) {
    throw new Error(output.error)
  }

  if (output.sourceMap) {
    const url = path.basename(dest)
    output.styles += `\n/*# sourceMappingURL=${url}.map */`
  }

  await write(dest, output.styles)

  if (output.sourceMap) {
    const sourceMapDest = `${path.dirname(dest)}/${sourceMap.url}`
    await write(sourceMapDest, output.sourceMap)
  }

  return output
}
