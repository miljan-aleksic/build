import path from 'path'
import uglify from 'uglify-js'
import CleanCSS from 'clean-css'
import { read, write } from './'

/*
 * Minify CSS/JS files with optional sourceMap
 */
export default function (src, { sourceMap = false } = {}) {
  return new Promise(async (resolve, reject) => {

    let code
    let map
    const ext = path.extname(src)

    const content = await read(src)

    if (ext === '.css') {
      const minified = await _minifyCSS(content, sourceMap)

      if (minified.error) {
        reject(minified.error)
      }

      code = minified.styles
      map = minified.sourceMap
    } else if (ext === '.js') {
      const minified = await _minifyJS(content, sourceMap)

      if (minified.error) {
        reject(minified.error)
      }

      code = minified.code
      map = minified.map
    }

    if (sourceMap) {
      const dest = src.replace(ext, `.min${ext}.map`)
      const url = path.basename(dest)
      code += `\n/*# sourceMappingURL=${url}*/`

      await write(dest, map)
    }

    const dest = src.replace(ext, `.min${ext}`)
    await write(dest, code)

    resolve()
  })
}

function _minifyCSS (content, sourceMap) {
  return new CleanCSS({
    sourceMap,
    advanced: false,
    keepSpecialComments: 0,
    rebase: false,
    returnPromise: true
  }).minify(content)
}

function _minifyJS (content, sourceMap) {
  return uglify.minify(content, {
    sourceMap,
    output: {
      ascii_only: true
    },
    compress: {
      pure_funcs: ['makeMap']
    }
  })
}
