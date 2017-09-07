class GlobalController {
  constructor ($q, $http, promiseQueue) {
    this.$q = $q
    this.$http = $http
    this.pq = promiseQueue

    // obviously this could be dynamic
    this.junkFile = new File(Array(10000).fill('abcdefg'), 'junk')
    this.progress = {
      'one': null,
      'two': null,
      'three': null,
      'four': null,
      'five': null,
      'six': null,
    }
    this.tasks = Object.keys(this.progress)
  }

  runQueue () {
    this.pq.run({
      tasks: this.tasks,
      maxConcurrent: 2,
      promiseCb: this.callback.bind(this)
    })
      .then(console.log)
  }

  callback (task) {
    const eventHandlers = {
      progress: ev => {
        this.progress[task] = Math.floor(ev.loaded * 100 / ev.total)
      }
    }
    return this.$http({
      method: 'POST',
      data: { file: this.junkFile },
      url: 'http://httpbin.org/post',
      uploadEventHandlers: eventHandlers,
    })
  }
}

angular
  .module('demo', ['ngPromiseQueue', 'ngMaterial'])
  //      .config(function ($mdThemingProvider) {
  //       $mdThemingProvider.theme('default')
  //    })
  .controller('Global', GlobalController)
