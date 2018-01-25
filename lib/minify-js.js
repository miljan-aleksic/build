import fs from 'fs'
import path from 'path'
import { read, write } from './'
import UglifyJS from 'uglify-js'

export default async function ({ src, dest, options = {} }) {
  dest = dest || src
  const code = fs.existsSync(src)
    ? await read(src)
    : src

  if (options.sourceMap !== undefined) {
    // set default sourceMap url
    options.sourceMap.url = options.sourceMap.url || `${path.basename(dest)}.map`
  }

  const output = await UglifyJS.minify(code, options)

  if (output.error) {
    throw new Error(output.error)
  }

  await write(dest, output.code)

  if (output.map) {
    const sourceMapDest = `${path.dirname(dest)}/${options.sourceMap.url}`
    await write(sourceMapDest, output.map)
  }

  return output
}
