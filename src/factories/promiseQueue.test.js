import promiseQueue from './promiseQueue.js'

test('Says "Hello World!"', () => {
  const queue = promiseQueue()
  expect(queue.sayHello()).toBe('Hello World!')
})

