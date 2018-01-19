import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import { promisify } from 'util'

const mkdirpSync = promisify(mkdirp)

export default function (dest, data) {
  return new Promise(async (resolve, reject) => {

    try {
      await mkdirpSync(path.dirname(dest))
      await fs.writeFileSync(dest, data)
    } catch (e) {
      reject(e)
    }

    resolve(dest)
  })
}
