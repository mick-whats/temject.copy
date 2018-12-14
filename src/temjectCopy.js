const fs = require('fs')
const path = require('path')
const { temject } = require('temject')
const writeFileAtomic = require('write-file-atomic')
const makeDir = require('make-dir')

/**
 * temjectCopy
 *
 * @param {string} srcPath - src file path
 * @param {string} distPath - dist file path
 * @param {Object} injections - inject key and value
 * @return {Promise}
 * @example
 * // 'Hello, {{name:pascal}}!' > temjectCopySrc.txt
 * const srcPath = path.join(os.tmpdir(), 'temjectCopySrc.txt')
 * const distPath = path.join(os.tmpdir(), 'temjectCopyDist.txt')
 * await temjectCopy(srcPath, distPath, { name: 'world' })
 * // temjectCopyDist.txt -> 'Hello, World!'
 */
module.exports = function temjectCopy (srcPath, distPath, injections) {
  return new Promise((resolve, reject) => {
    fs.readFile(srcPath, 'utf8', (err, src) => {
      if (err) reject(err)
      const data = temject(src, injections)
      makeDir.sync(path.dirname(distPath))
      writeFileAtomic(distPath, data, err => {
        if (err) reject(err)
        resolve()
      })
    })
  })
}
