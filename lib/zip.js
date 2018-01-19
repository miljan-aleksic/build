import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import archiver from 'archiver'

/*
 * Zip matched patterns
 */
export default async function (src, dest) {
  const destDirname = path.dirname(dest)

  try {

    // make sure dest folder exists
    mkdirp.sync(destDirname)

  } catch (e) {
    throw new Error(e)
  }

  return new Promise((resolve, reject) => {
    // create a file to stream archive data to
    const output = fs.createWriteStream(dest)
    const archive = archiver('zip')

    // listen for all archive data to be written
    output.on('close', () => {
      if (fs.existsSync(dest)) {
        const size = archive.pointer()
        resolve(size)
        return
      }

      // if file doesn't exist
      reject(new Error(`Creation of ${dest} failed`))
    })

    archive.on('error', err => { throw err })

    // pipe archive data to the file
    archive.pipe(output)

    archive.directory(src, false)

    archive.finalize()
  })
}
