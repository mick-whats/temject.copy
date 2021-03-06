const { expressionFiles } = require('..')
const globby = require('globby')

test('expressionFiles', async () => {
  const paths = await globby('./src/__tests__/testFiles', {
    gitignore: true,
    dot: true
  })
  const res = await expressionFiles(paths)
  expect(res).toHaveLength(4)
  expect(res).toContain('readme')
  expect(res).toContain('ig')
  expect(res).toContain('home')
  expect(res).toContain('name')
})

test('expressionFiles glob', async () => {
  const res = await expressionFiles('./src/__tests__/testFiles/')
  expect(res).toHaveLength(4)
  expect(res).toContain('readme')
  expect(res).toContain('ig')
  expect(res).toContain('home')
  expect(res).toContain('name')
})
test('expressionFiles glob', async () => {
  const res = await expressionFiles(
    ['./src/__tests__/testFiles/', '!**/ignore.txt'],
    { dot: false }
  )
  expect(res).toHaveLength(2)
  expect(res).toContain('readme')
  expect(res).toContain('name')
})
