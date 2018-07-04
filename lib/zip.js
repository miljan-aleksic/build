import Zip from 'adm-zip'
import path from 'path'
import mkdirp from 'mkdirp'
import globby from 'globby'

/*
 * Zip matched patterns
 */
export default async function (src, dest) {
  const zipper = new Zip()

  return new Promise(async (resolve, reject) => {
    const files = await globby(`${src}/**/*`, {
      ignore: ['.DS_Store']
    })

    try {
      files.forEach(file => {
        const zipPath = path.dirname(path.relative(src, file))
        zipper.addLocalFile(file, zipPath)
      })

      // create dest folder and zip
      mkdirp.sync(path.dirname(dest))
      zipper.writeZip(dest)

      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
