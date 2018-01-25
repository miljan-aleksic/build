export default async function (fn) {
  try {

    await fn()

  } catch (e) {
    throw e
  }
}
