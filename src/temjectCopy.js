const path = require('path')
const { temject } = require('temject')
const writeFileAtomic = require('write-file-atomic')
const makeDir = require('make-dir')
const readFile = require('./readFile')
const errors = require('./errors')

/** @module temjectCopy */
/**
 * temjectCopy
 *
 * @param {string} srcPath - src file path
 * @param {string} distPath - dist file path
 * @param {Object} injections - inject key and value
 * @param {Object} [opts={}] - options
 * @param {boolean} [opts.plain=false] - Plain copy
 * @param {boolean} [opts.overwrite=false] - Force overwrite
 * @return {Promise<boolean>}
 * @example
 * // 'Hello, {{name:pascal}}!' > temjectCopySrc.txt
 * const srcPath = 'src.txt'
 * const distPath = 'dist.txt'
 * await temjectCopy(srcPath, distPath, { name: 'world' })
 * // dist.txt -> 'Hello, World!'
 */
async function temjectCopy (srcPath, distPath, injections, opts = {}) {
  const src = await readFile(srcPath)
  let data = null
  if (!opts.overwrite) {
    const isExistFile = await readFile(distPath)
    if (isExistFile) {
      throw new Error(errors.duplicateFile)
    }
  }
  if (opts.plain) {
    data = src
  } else {
    data = temject(src, injections)
  }
  makeDir.sync(path.dirname(distPath))
  writeFileAtomic.sync(distPath, data)
  return true
}

module.exports = temjectCopy
