function promiseQueue ($q) {
  function execQueue ({ queue = [], maxConcurrent = 1, promiseCb }, promisedTasks = [], deferred) {
    if (!deferred) {
      deferred = $q.defer()
    } else if (!queue.length) {
      $q.all(promisedTasks).then(deferred.resolve) // End recursion and resolve deferred
    }

    const toRun = queue.splice(0, maxConcurrent) // Mutate queue to keep concurrent runs in sync

    toRun.forEach(task => {
      const taskPromise = promiseCb(task)
        .then(res => {
          execQueue({ queue, promiseCb }, promisedTasks, deferred) // recurse on success
          return res
        })
        .catch(err => {
          execQueue({ queue, promiseCb }, promisedTasks, deferred) // recurse on failure
          return err
        })
      promisedTasks.push(taskPromise)
    })

    return deferred.promise

  }

  return { execQueue }
}

promiseQueue.$inject = ['$q']

export default promiseQueue

