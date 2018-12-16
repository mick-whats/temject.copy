const { temjectCopyRecursive } = require('..')
const { temjectCopy } = require('..')
jest.mock('../temjectCopy')

beforeEach(() => {
  temjectCopy.mockReset()
})

test('temjectCopyRecursive -dry ', async () => {
  await temjectCopyRecursive(
    ['./src/__tests__/testFiles'],
    './sample',
    { name: 'MyName' },
    { dot: false, dry: true }
  )
  expect(temjectCopy).not.toBeCalled()
})
test('string first args', async () => {
  await temjectCopyRecursive('./src/__tests__/testFiles', './sample', {
    name: 'MyName'
  })
  expect(temjectCopy).toBeCalledTimes(3)
})
test('other type first args', async () => {
  await temjectCopyRecursive(true, './sample', {
    name: 'MyName'
  })
  expect(temjectCopy).toBeCalledTimes(0)
})
test('unknown path', async () => {
  const res = await temjectCopyRecursive('hogehogerock', './sample', {
    name: 'MyName'
  })
  // 最終的にPromise.allが空の配列で呼ばれてpaths(空の配列)が戻る
  expect(res).toEqual([])
  expect(temjectCopy).toBeCalledTimes(0)
})
test('all files ', async () => {
  await temjectCopyRecursive(['./src/__tests__/testFiles'], './sample', {
    name: 'MyName'
  })
  expect(temjectCopy).toBeCalledTimes(3)
})
test('ignore dotfiles ', async () => {
  await temjectCopyRecursive(
    ['./src/__tests__/testFiles'],
    './sample',
    { name: 'MyName' },
    { dot: false }
  )
  expect(temjectCopy).toBeCalledTimes(2)
})
test('ignore dotfiles and glob ', async () => {
  await temjectCopyRecursive(
    ['./src/__tests__/testFiles', '!**/ignore.txt'],
    './sample',
    { name: 'MyName' },
    { dot: false }
  )
  expect(temjectCopy).toBeCalledTimes(1)
})
test('plainCopy with string', async () => {
  await temjectCopyRecursive(
    ['./src/__tests__/testFiles'],
    './sample',
    { name: 'MyName' },
    { plainCopy: ['**/ignore.txt'] }
  )
  const target = temjectCopy.mock.calls.find(item => {
    return /ignore.txt$/.test(item[0])
  })[3]
  expect(target).toEqual({ plain: true })
  const notTarget = temjectCopy.mock.calls.find(item => {
    return !/ignore.txt$/.test(item[0])
  })[3]
  expect(notTarget).toEqual({ plain: false })
})
test('plainCopy with regex', async () => {
  await temjectCopyRecursive(
    ['./src/__tests__/testFiles'],
    './sample',
    { name: 'MyName' },
    { plainCopy: [/ignore.txt$/] }
  )
  const target = temjectCopy.mock.calls.find(item => {
    return /ignore.txt$/.test(item[0])
  })[3]
  expect(target).toEqual({ plain: true })
  const notTarget = temjectCopy.mock.calls.find(item => {
    return !/ignore.txt$/.test(item[0])
  })[3]
  expect(notTarget).toEqual({ plain: false })
})
test('plainCopy with other', async () => {
  await temjectCopyRecursive(
    ['./src/__tests__/testFiles'],
    './sample',
    { name: 'MyName' },
    { plainCopy: [true] }
  )
  const target = temjectCopy.mock.calls.find(item => {
    return /ignore.txt$/.test(item[0])
  })[3]
  expect(target).toEqual({ plain: false })
  const notTarget = temjectCopy.mock.calls.find(item => {
    return !/ignore.txt$/.test(item[0])
  })[3]
  expect(notTarget).toEqual({ plain: false })
})
