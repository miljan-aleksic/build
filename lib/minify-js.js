import fs from 'fs'
import path from 'path'
import UglifyJS from 'uglify-js'
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

  const output = await UglifyJS.minify(code, {
    ...options,
    sourceMap
  })

  if (output.error) {
    throw new Error(output.error)
  }

  await write(dest, output.code)

  if (output.map) {
    const sourceMapDest = `${path.dirname(dest)}/${sourceMap.url}`
    await write(sourceMapDest, output.map)
  }

  return output
}
