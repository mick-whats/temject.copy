const readFile = require('./readFile')
const globby = require('globby')
const { expressions } = require('temject')
/** @module temjectCopy */
/**
 * expressionFiles
 * fileに書き込まれているexpressionsを抽出する
 *
 * @param {Array|string} glob - paths or glob
 * @param {Object} [opts={}] - globby options
 * @see https://github.com/sindresorhus/globby#options
 * @return {Promise<Array>}
 * @example
 * const opts = {dot: false}
 * const res = await expressionFiles([
 *   './src/__tests__/testFiles/',
 *   '!ignore.txt'
 * ], opts)
 * // -> [ 'name', 'readme' ]
 */
async function expressionFiles (glob, opts = {}) {
  opts = Object.assign({ dot: true }, opts)
  const paths = await globby(glob, opts)
  return Promise.all(paths.map(p => readFile(p))).then(items => {
    return expressions(items.join(''))
  })
}

module.exports = expressionFiles
