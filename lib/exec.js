/*
 * Exec a shell command using child_process
 */
export default function (command, options = {}) {
  return new Promise((resolve, reject) => {
    const { exec } = require('child_process')

    exec(command, options, (err, stdout, stderr) => {
      if (err !== null) {
        reject(stderr)
      } else {
        resolve(stdout)
      }
    })
  })
}
