const temjectCopy = require('../temjectCopy')
const os = require('os')
const fs = require('fs')
const writeFileAtomic = require('write-file-atomic')
const path = require('path')
const srcPath = path.join(os.tmpdir(), 'temjectCopySrc.txt')
const distDir = path.join(os.tmpdir(), 'testDir')
const distPath = path.join(distDir, 'temjectCopyDist.txt')
beforeEach(done => {
  writeFileAtomic(srcPath, 'Hello, {{name:pascal}}!', err => {
    if (err) throw err
    done()
  })
})
afterEach(() => {
  fs.unlinkSync(srcPath)
  fs.unlinkSync(distPath)
  fs.rmdirSync(distDir)
})
test('temjectCopy test', async () => {
  // "testDir" is not found
  expect(() => {
    fs.statSync(distDir)
  }).toThrow('ENOENT: no such file or directory')
  await temjectCopy(srcPath, distPath, { name: 'world' })
  const res = fs.readFileSync(distPath, 'utf8')
  expect(res).toBe('Hello, World!')
})
