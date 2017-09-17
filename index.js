class GlobalController {
  constructor ($q, $http, $timeout, $mdToast, promiseQueue) {
    this.$q = $q
    this.$http = $http
    this.$timeout = $timeout
    this.$mdToast = $mdToast
    this.pq = promiseQueue

    // obviously this could be dynamic
    this.junkFile = new File(Array(10000).fill('abcdefg'), 'junk')
    this.concurrency = 2
    this.tasks = [
      { name: 'one', status: 'todo' },
      { name: 'two', status: 'todo' },
      { name: 'three', status: 'todo' },
    ]
    this.progress = this.tasks.reduce((acc, task) => {
      acc[task.name]
      return acc
    }, {})
  }

  runQueue () {
    this.pq.run({
      tasks: this.tasks,
      maxConcurrent: this.concurrency,
      promiseCb: this.callback.bind(this)
    })
      .then(this.endQueue.bind(this))
  }

  endQueue (res) {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent('All Tasks Complete')
        .position('bottom right')
        .hideDelay(1500)
    )

    this.$timeout(() => {
      this.tasks.forEach(task => task.status = 'todo')
      for (let key in this.progress) {
        this.progress[key] = 0
      }
    }, 1500)
    console.log(res)
  }

  callback (task) {
    task.status = 'running'
    const eventHandlers = {
      progress: ev => {
        this.progress[task.name] = Math.floor(ev.loaded * 100 / ev.total)
        if (ev.loaded === ev.total) task.status = 'finished'
      }
    }
    return this.$http({
      method: 'POST',
      data: { name: task.name, file: this.junkFile },
      url: 'https://httpbin.org/post',
      uploadEventHandlers: eventHandlers,
    })
  }
}

angular
  .module('demo', ['ngPromiseQueue', 'ngMaterial'])
  .controller('Global', GlobalController)
