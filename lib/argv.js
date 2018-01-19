import minimist from 'minimist'

/*
 * Return node process arguments with an easier to use format
 */
export default function (options = {}) {
  return minimist(process.argv.slice(2), options)
}
