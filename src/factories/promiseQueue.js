function promiseQueue($q) {
  function run(
    { tasks = [], maxConcurrent = 1, promiseCb },
    promisedTasks = [],
    deferred,
  ) {
    const mutTasks = deferred ? tasks : [...tasks]

    if (!deferred) {
      deferred = $q.defer()
    } else if (!tasks.length) {
      $q.all(promisedTasks).then(deferred.resolve) // End recursion and resolve deferred
    }

    const toRun = mutTasks.splice(0, maxConcurrent) // Mutate to keep concurrent runs in sync
    toRun.forEach(task => {
      try {
        const taskPromise = promiseCb(task)
          .then(res => {
            run({ tasks: mutTasks, promiseCb }, promisedTasks, deferred) // recurse on success
            return res
          })
          .catch(err => {
            run({ tasks: mutTasks, promiseCb }, promisedTasks, deferred) // recurse on failure
            return err
          })
        promisedTasks.push(taskPromise)
      } catch (e) {
        // very likely that promiseCb is not a promise returning function at this point
        deferred.reject(e)
      }
    })

    return deferred.promise
  }

  return { run }
}

promiseQueue.$inject = ['$q']

export default promiseQueue
