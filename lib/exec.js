/*
 * Exec a shell command using child_process
 */
export default function (command, options = {}) {
  return new Promise((resolve, reject) => {
    const exec = require('child_process').exec

    exec(command, options, (error, stdout, stderr) => {
      if (error !== null) {
        reject(error)
      } else {
        console.log(stdout)
        console.log(stderr)
        resolve()
      }
    })
  })
}
