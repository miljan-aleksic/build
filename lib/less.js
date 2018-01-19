import fs from 'fs'
import less from 'less'
import { read, write } from './'

export default async function ({ src, dest, options = {} }) {
  const source = fs.existsSync(src)
    ? await read(src)
    : src

  const output = await less.render(source, options)

  if (dest) {
    await write(dest, output.css)
  }

  return output.css
}
