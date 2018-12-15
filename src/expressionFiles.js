const readFile = require('./readFile')
const globby = require('globby')
const { expressions } = require('temject')

/**
 * expressionFiles
 * fileに書き込まれているexpressionsを抽出する
 *
 * @param {Array} glob - paths or glob
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
module.exports = function expressionFiles (glob, opts = {}) {
  return new Promise(async (resolve, reject) => {
    opts = Object.assign({ dot: true }, opts)
    const paths = await globby(glob, opts)
    Promise.all(paths.map(p => readFile(p)))
      .then(items => {
        const res = expressions(items.join(''))
        return resolve(res)
      })
      .catch(reject)
  })
}
