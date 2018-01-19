import copy from 'recursive-copy'

export default async function (src, dest, filter = []) {
  await copy(src, dest, {
    filter: [
      ...['**/*'], // require to avoid filtering it all out
      ...filter
    ]
  })
}
