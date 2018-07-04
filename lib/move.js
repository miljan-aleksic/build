import copy from './copy'
import remove from './remove'

export default async function (src, dest) {
  await copy(src, dest)
  await remove(src)
}
