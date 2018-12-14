const path = require('path')
const readFile = require('./readFile')
const globby = require('globby')
const { expressions } = require('temject')

/**
 * expressionFiles
 * fileに書き込まれているexpressionsを抽出する
 *
 * @param {Array} glob - paths or glob
 * @param {Object} [opts={}]
 * @return {Promise<Array>}
 * @example
 * const opts = {ignoreFile: ['ignore.txt']}
 * const res = await expressionFiles(paths, opts)
 * // -> [ 'name', 'home', 'readme' ]
 */
module.exports = function expressionFiles (glob, opts = {}) {
  return new Promise(async (resolve, reject) => {
    console.log('glob: ', glob)
    const paths = await globby(glob, { dot: true })
    console.log('paths: ', paths)
    Promise.all(paths.map(p => readFile(p)))
      .then(items => {
        const res = expressions(items.join(''))
        return resolve(res)
      })
      .catch(reject)
  })
}
