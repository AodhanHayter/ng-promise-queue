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

test('Calls promiseCb that was passed as a param', done => {
    const userPromise  = (task) => {
      return $q((resolve, reject) => {
        resolve(task)
      })
    }
  const tasks = [ 'one' ]
  promiseQueue.execQueue({
    queue: tasks,
    maxConcurrent: 1,
    promiseCb: userPromise
  })
  .then(res => {
    const [ firstResult ] = res
    expect(firstResult).toEqual('one')
    done()
  })
  $rootScope.$apply()
})

