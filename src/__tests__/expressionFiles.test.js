const expressionFiles = require('../expressionFiles')
const os = require('os')
const fs = require('fs')
const path = require('path')
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
  const res = await expressionFiles([
    './src/__tests__/testFiles/',
    '!**/ignore.txt'
  ])
  expect(res).toHaveLength(3)
  expect(res).toContain('readme')
  expect(res).toContain('home')
  expect(res).toContain('name')
})
