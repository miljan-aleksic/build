import path from 'path'
import globby from 'globby'
import { minifyJS, minifyCSS } from './'

export default async function (src, options = {}) {
  const sources = await globby(src)

  const isCSS = src => path.extname(src) === '.css'
  const isJS = src => path.extname(src) === '.js'

  return Promise.all([
    ...sources.filter(isJS).map(src => minifyJS({ src, options })),
    ...sources.filter(isCSS).map(src => minifyCSS({ src, options }))
  ])
}
