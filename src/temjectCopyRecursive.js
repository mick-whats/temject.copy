const path = require('path')
const globby = require('globby')
const minimatch = require('minimatch')
const temjectCopy = require('./temjectCopy')
/** @module temjectCopy */
/**
 * temjectCopy
 *
 * @param {string} srcDir - src file directory or glob
 * @param {string} distDir - dist directory path
 * @param {Object} injections - inject key and value
 * @param {Object} [opts={}] - options
 * @param {boolean} [opts.dry=false] - not copy
 * @param {Array} [opts.plainCopy=false] - not temject convert
 * @param {boolean} [opts.overwrite=false] - Force overwrite
 * @return {Promise<undefined>}
 * @example
 * await temjectCopyRecursive(
 *   ['./testFiles'],
 *   './sample',
 *   { name: 'MyName' },
 *   { dot: false, dry: true }
 * )
 */
async function temjectCopyRecursive (srcDir, distDir, injections, opts = {}) {
  opts = Object.assign({ dot: true }, opts)
  const cwd = opts.cwd || process.cwd()
  let globPattern = []
  if (typeof srcDir === 'string') {
    globPattern = [srcDir]
  } else if (Array.isArray(srcDir)) {
    globPattern = srcDir
    srcDir = srcDir[0]
  } else {
    return null
  }
  if (!path.isAbsolute(globPattern[0])) {
    globPattern[0] = srcDir = path.join(cwd, globPattern[0])
  }
  if (!path.isAbsolute(distDir)) {
    distDir = path.join(cwd, distDir)
  }

  let paths = await globby(globPattern, opts)
  const plains =
    opts.plainCopy && Array.isArray(opts.plainCopy) ? opts.plainCopy : []

  paths = paths.map(p => {
    const _p = p.replace(srcDir, '')
    const isPlain = plains.some(plainItem => {
      if (plainItem instanceof RegExp) {
        return plainItem.test(p)
      } else if (typeof plainItem === 'string') {
        return minimatch(p, plainItem)
      } else {
        return false
      }
    })
    return {
      src: p,
      dist: path.join(distDir, _p),
      isPlain
    }
  })
  if (opts.dry) {
    return paths
  } else {
    return Promise.all(
      paths.map(p => {
        const temjectOpts = p.isPlain ? { plain: true } : { plain: false }
        temjectOpts.overwrite = opts.overwrite
        return temjectCopy(p.src, p.dist, injections, temjectOpts)
      })
    ).then(() => {
      return paths
    })
  }
}

module.exports = temjectCopyRecursive
