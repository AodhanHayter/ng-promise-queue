# [Demo](https://aodhanhayter.github.io/ng-promise-queue/)

# Install

```bash
$ yarn add ng-promise-queue
```

Or

```bash
$ npm install ng-promise-queue
```

# Add To Your Angular App

Supports usage of modules or require.js. Expects angular to be available globally, so if using a module bundler (webpack) be sure your setup supports this.

```javascript
import ngPromiseQueue from 'ng-promise-queue' // or
const ngPromiseQueue = require('ng-promise-queue')

// Only the modules .name property is exported

angular.module('yourApp', [ngPromiseQueue])
```

Or more more traditionally just reference the file from a script tag

```javascript
<script src="node_modules/ng-promise-queue/dist/ngPromiseQueue.min.js"></script>

angular.module('yourApp', ['ngPromiseQueue']) // just reference the module's name as string
```

# Use

ngPromiseQueue exposes a factory that you can inject.

```javascript
function SomeController (promiseQueue) {
  promiseQueue.run()
}
```
`.run()` is the only method exposed from the promiseQueue factory. It takes a simple configuration object as its only argument

```javascript
function SomeController (promiseQueue, $timeout) {

  // must be an array, can contain whatever data your callback needs to operate on
  const tasks = [1,2,3]

  // The number of tasks you'd like to run at the same time
  const maxConcurrent = 2 // will default to 1 if not passed

  // A callback function that returns a promise and takes a task as an argument
  const promiseCb = function (task) {
      return $timeout(() => {
        return task
      }, 3000)
  }

  const config = {
        tasks,
        maxConcurrent,
        promiseCb,
    }

  promiseQueue.run(config)
}
```

`promiseQueue.run()` returns a promise, the promise will resolve when all tasks are complete.

```javascript
function SomeController (promiseQueue) {
  promiseQueue.run(config)
    // Even if the promiseCb is rejected, the outer promiseQueue promise will still continue.
    .then(console.log)
    // If the promiseCb raises an exception the queue will be rejected and the exception caught here
    .catch(console.error)
}
```

Results are returned as an array, and in the order that they resolved or were rejected

```javascript
function SomeController (promiseQueue) {
  promiseQueue.run(config)
    .then(results => {
      const failed = results.filter(task => task.response.code === 500)
      const success = results.filter(task => task.response.code === 200)
    })
}
```

# Development

### Install dependencies

```bash
$ yarn
```

### Run tests

```bash
$ yarn test
```

### Build

```bash
$ yarn build
```
