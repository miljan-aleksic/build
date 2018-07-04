import path from 'path'
import globby from 'globby'
import read from './read'
import write from './write'

/*
 * Add top banner to matched glob patterns
 */
export default async function (src, banner) {
  const files = await globby(src, {
    nodir: true
  })

  return Promise.all(files.map(
    async file => {
      await _applyBanner(file, banner)
    }
  ))
}

async function _applyBanner (file, banner) {
  const ext = path.extname(file)
  let content = await read(file)

  if (ext === '.php') {
    content = content.replace(/^<\?php/g, `<?php\n${banner}`)
  } else {
    content = `${banner}\n\n${content}`
  }

  return write(file, content)
}
