const temjectCopyRecursive = require('../temjectCopyRecursive')
test.skip('should ', async () => {
  const res = await temjectCopyRecursive(
    ['./src/__tests__/testFiles'],
    './sample',
    {
      name: 'MyName',
      readme: 'MyReadme',
      ig: 'MyIgnore',
      home: 'MyHome'
    }
  )
  console.log('res: ', res)
})
