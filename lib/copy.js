import cpy from 'cpy'

export default async function (src, dest, options = {}) {
  return cpy(src, dest, options)
}
