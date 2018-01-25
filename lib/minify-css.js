import fs from 'fs'
import path from 'path'
import { read, write } from './'
import CleanCSS from 'clean-css'

export default async function ({ src, dest, options = {} }) {
  dest = dest || src
  const code = fs.existsSync(src)
    ? await read(src)
    : src

  if (options.sourceMap !== undefined) {
    // set default sourceMap url
    options.sourceMap.url = options.sourceMap.url || `${path.basename(dest)}.map`
  }

  const output = await new CleanCSS({
    rebase: false,
    returnPromise: true,
    ...options
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
    const sourceMapDest = `${path.dirname(dest)}/${options.sourceMap.url}`
    await write(sourceMapDest, output.sourceMap)
  }

  return output
}
