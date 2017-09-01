function promiseQueue () {
  function sayHello () {
    return 'Hello World!'
  }
  return { sayHello }
}

export default promiseQueue

