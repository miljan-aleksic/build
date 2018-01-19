import fs from 'fs'

export default function (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }

      resolve(data)
    })
  })
}
