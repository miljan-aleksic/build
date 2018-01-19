import { write } from './'
import download from 'download'

/*
 * Download a resource
 */
export default async function (url, dest) {
  const data = await download(url)

  return write(dest, data)
}
