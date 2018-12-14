const fs = require('fs')
const path = require('path')
const { temject } = require('temject')
const writeFileAtomic = require('write-file-atomic')
const makeDir = require('make-dir')
const globby = require('globby')
/**
 * temjectCopy
 *
 * @param {string} srcPath - src file path
 * @param {string} distPath - dist file path
 * @param {Object} injections - inject key and value
 * @return {Promise}
 */
module.exports = function expressionFiles (dir, opts) {
  return new Promise((resolve, reject) => {})
}
