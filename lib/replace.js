import globby from 'globby'
import read from './read'
import write from './write'

export default async function (src, search, replaceWith) {
  const files = isString(src) || isArray(src)
    ? await globby(src)
    : src

  await Promise.all(files.map(async file => {
    let content = await read(file)

    content = content.replace(search, replaceWith)

    await write(file, content)
  }))
}

function isString (value) {
  return typeof value === 'string'
}

const { isArray } = Array
