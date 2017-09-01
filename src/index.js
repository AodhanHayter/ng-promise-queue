import angular from 'angular'
import promiseQueue from './factories/promiseQueue.js'

module.exports = angular.module('ngPromiseQueue', [])
  .factory('promiseQueue', promiseQueue)
  .name

