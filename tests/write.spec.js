const fs = require('fs')
const lib = require('../index.js')

test('Write File', async () => {
  const path = 'tests/xxx/write-test.md'

  await lib.write(path)
  expect(fs.existsSync(path)).toBe(true)
  expect(fs.statSync(path).size).toBe(9)
})
