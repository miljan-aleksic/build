const fs = require('fs')
const lib = require('../index.js')

test('ZIP folders', async () => {
  await lib.zip('tests/assets', 'tests/xxx/zipped.zip')

  expect(fs.existsSync('tests/xxx/zipped.zip')).toBe(true)
  expect(fs.statSync('tests/xxx/zipped.zip').size).toBe(327)
})
