import fs from 'fs'
import less from 'less'
import read from './read'
import write from './write'

export default async function ({ src, dest, options = {} }) {
  dest = dest || src.replace('.less', '.css')
  const code = fs.existsSync(src)
    ? await read(src)
    : src

  const output = await less.render(code, options)

  await write(dest, output.css)

  return output.css
}
