import ora from 'ora'

export default async function (text, task) {
  const spinner = ora(text).start()

  try {

    await task(spinner)

  } catch (e) {
    spinner.fail()
    throw e
  }

  spinner.succeed()
}
