import angular from 'angular'
import 'angular-mocks'
import app from '../index.js'

let promiseQueue
let $rootScope
let $q

beforeEach(() => {
  angular.mock.module(app)
})

beforeEach(inject((_promiseQueue_, _$rootScope_, _$q_) => {
  promiseQueue = _promiseQueue_
  $rootScope = _$rootScope_
  $q = _$q_
}))

test('Defines an execQueue() function', () => {
  expect(promiseQueue.execQueue).toBeDefined()
})

test('Promise is rejected when callback is not a promise returning function', done => {
  const nonPromiseFn = _ => 'not a promise'
  const tasks = ['one']
  promiseQueue.execQueue({
    queue: tasks,
    maxConcurrent: 1,
    promiseCb: nonPromiseFn,
  }).catch(e => {
    expect(e).toBeInstanceOf(TypeError)
    done()
  })
  $rootScope.$apply()
})

test('Callback is executed for every task in queue', done => {
    const mockedCb = jest.fn((task) => {
      return $q((resolve, reject) => {
        resolve(task)
      })
    })
  const tasks = [ 'one', 'two', 'three' ]
  promiseQueue.execQueue({
    queue: tasks,
    maxConcurrent: 1,
    promiseCb: mockedCb,
  })
  .then(res => {
    expect(mockedCb.mock.calls).toHaveLength(3)
    done()
  })
  $rootScope.$apply()
})
