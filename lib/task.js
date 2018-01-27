import ora from 'ora'
import chalk from 'chalk'

export default async function (text, task) {
  const spinner = ora(text).start()

  return Promise.resolve(task(spinner)).then(() => {
    spinner.succeed()
  }, err => {
    spinner.fail()
    console.log(chalk.bold.red(err))
    process.exit(1)
  })
}
