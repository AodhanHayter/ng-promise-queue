import angular from 'angular'
import 'angular-mocks'
import app from '../index.js'

let promiseQueue
let $rootScope
let $q
let $timeout

beforeEach(() => {
  angular.mock.module(app)
})

beforeEach(
  inject((_promiseQueue_, _$rootScope_, _$q_, _$timeout_) => {
    promiseQueue = _promiseQueue_
    $rootScope = _$rootScope_
    $q = _$q_
    $timeout = _$timeout_
  }),
)

test('Exposes a run() function', () => {
  expect(promiseQueue.run).toBeDefined()
})

test('Is rejected when callback is not a promise returning function', done => {
  const nonPromiseFn = _ => 'not a promise'
  const tasks = ['one']
  promiseQueue
    .run({
      tasks,
      maxConcurrent: 1,
      promiseCb: nonPromiseFn,
    })
    .catch(e => {
      expect(e).toBeInstanceOf(TypeError)
      done()
    })
  $rootScope.$apply()
})

test('promiseCb() is executed for every task in queue', done => {
  const mockedCb = jest.fn(task => {
    return $q((resolve, reject) => {
      resolve(task)
    })
  })
  const tasks = ['one', 'two', 'three']
  promiseQueue
    .run({
      tasks,
      maxConcurrent: 1,
      promiseCb: mockedCb,
    })
    .then(res => {
      expect(mockedCb.mock.calls).toHaveLength(3)
      done()
    })
  $rootScope.$apply()
})

test('All values of RESOLVED promises are returned as an array', done => {
  const cb = task => $q(resolve => resolve(task))
  const tasks = ['one', 'two', 'three', 'four']
  promiseQueue
    .run({
      tasks,
      promiseCb: cb,
    })
    .then(res => {
      expect(res).toBeInstanceOf(Array)
      expect(res).toHaveLength(4)
      done()
    })
  $rootScope.$apply()
})

test('All values of REJECTED promises are returned as an array', done => {
  const cb = task => $q((_, reject) => reject(task))
  const tasks = ['one', 'two', 'three', 'four']
  promiseQueue
    .run({
      tasks,
      promiseCb: cb,
    })
    .then(res => {
      expect(res).toBeInstanceOf(Array)
      expect(res).toHaveLength(4)
      done()
    })
  $rootScope.$apply()
})

test('Exceptions raised from promiseCb() are caught in catch block of promiseQueue', done => {
  const cb = task =>
    $q((_, reject) => {
      throw new Error('Thrown in promise')
    })
  const tasks = ['one', 'two', 'three', 'four']
  promiseQueue
    .run({
      tasks,
      promiseCb: cb,
    })
    .catch(err => {
      expect(err).toBeInstanceOf(Error)
      done()
    })
  $rootScope.$apply()
})
