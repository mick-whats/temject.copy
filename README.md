# temject.copy
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmick-whats%2Ftemject.copy.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmick-whats%2Ftemject.copy?ref=badge_shield)


Copy the file while converting with temject

[temject \- npm](https://www.npmjs.com/package/temject)

| function             | temject | temjectCopy |
| -------------------- | ------- | ----------- |
| temject              | ⭕       | ⭕           |
| keyValueInjector     | ⭕       | ⭕           |
| dateTimeInjector     | ⭕       | ⭕           |
| expressions          | ⭕       | ⭕           |
| expressionFiles      | ✘       | ⭕           |
| temjectCopy          | ✘       | ⭕           |
| temjectCopyRecursive | ✘       | ⭕           |

## API

### expressionFiles(glob [,opts])

| Param  | Type                                      | Default         | Description                                                 |
| ------ | ----------------------------------------- | --------------- | ----------------------------------------------------------- |
| glob   | <code>Array</code> \| <code>string</code> |                 | paths or glob                                               |
| [opts] | <code>Object</code>                       | <code>{}</code> | [fast\-glob](https://github.com/mrmlnc/fast-glob#options-1) |


```js
await expressionFiles('./testFiles/')
// -> ['foo','bar']
```




```js
await expressionFiles(
  ['./testFiles/', '!**/ignore.txt'],
  { dot: false }
)
```

### temjectCopy(srcPath, distPath, injections [, opts])
 
| Param            | Type                 | Default            | Description          |
| ---------------- | -------------------- | ------------------ | -------------------- |
| srcPath          | <code>string</code>  |                    | src file path        |
| distPath         | <code>string</code>  |                    | dist file path       |
| injections       | <code>Object</code>  |                    | inject key and value |
| [opts]           | <code>Object</code>  | <code>{}</code>    | options              |
| [opts.plain]     | <code>boolean</code> | <code>false</code> | Plain copy           |
| [opts.overwrite] | <code>boolean</code> | <code>false</code> | Force overwrite      |

**Example**  
```js
// 'Hello, {{name:pascal}}!' > src.txt
const srcPath = 'src.txt'
const distPath = 'dist.txt'
await temjectCopy(srcPath, distPath, { name: 'world' })
// dist.txt -> 'Hello, World!'
```

### temjectCopyRecursive(srcDir, distDir, injections [, opts])

| Param            | Type                 | Default            | Description                |
| ---------------- | -------------------- | ------------------ | -------------------------- |
| srcDir           | <code>string</code>  |                    | src file directory or glob |
| distDir          | <code>string</code>  |                    | dist directory path        |
| injections       | <code>Object</code>  |                    | inject key and value       |
| [opts]           | <code>Object</code>  | <code>{}</code>    | options                    |
| [opts.dry]       | <code>boolean</code> | <code>false</code> | not copy                   |
| [opts.plainCopy] | <code>Array</code>   | <code>false</code> | not temject convert        |
| [opts.overwrite] | <code>boolean</code> | <code>false</code> | Force overwrite            |

**Example**  
```js
await temjectCopyRecursive(
  ['./testFiles'],
  './sample',
  { name: 'MyName' },
  { dot: false, dry: true }
)
```

```js
await temjectCopyRecursive(
  ['./src/__tests__/testFiles'],
  './sample',
  { name: 'MyName' },
  { plainCopy: [/ignore.txt$/] } // no convert setting
)
```

## Related

[temject \- npm](https://www.npmjs.com/package/temject)

## License
MIT © mick-whats



[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmick-whats%2Ftemject.copy.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmick-whats%2Ftemject.copy?ref=badge_large)