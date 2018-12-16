const { temjectCopyRecursive } = require('..')

// mockを使わず実際にコピーを行う
test.skip('real copy', async () => {
  const res = await temjectCopyRecursive(
    ['./src/__tests__/testFiles'],
    './sample',
    {
      name: 'MyName',
      readme: 'MyReadme',
      ig: 'MyIgnore',
      home: 'MyHome'
    },
    {
      plainCopy: ['**/.test.txt'],
      overwrite: true
    }
  )
  console.log('res: ', res)
})
