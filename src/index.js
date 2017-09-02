import angular from 'angular'
import promiseQueue from './factories/promiseQueue.js'

export default angular.module('ngPromiseQueue', [])
  .factory('promiseQueue', promiseQueue)
  .name

