const lib = require('../index.js')

test('Read File', async () => {
  const file = await lib.read('tests/assets/file1.md')

  expect(file).toBe('text\n')
})
