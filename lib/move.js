import { copy, remove } from './'

export default async function (src, dest) {
  await copy(src, dest)
  await remove(src)
}
