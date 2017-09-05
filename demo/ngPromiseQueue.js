(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["ng-promise-queue"] = factory(require("angular"));
	else
		root["ngPromiseQueue"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__factories_promiseQueue_js__ = __webpack_require__(2);



/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('ngPromiseQueue', []).factory('promiseQueue', __WEBPACK_IMPORTED_MODULE_1__factories_promiseQueue_js__["a" /* default */]).name);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function promiseQueue($q) {
  function run(_ref) {
    var _ref$tasks = _ref.tasks,
        tasks = _ref$tasks === undefined ? [] : _ref$tasks,
        _ref$maxConcurrent = _ref.maxConcurrent,
        maxConcurrent = _ref$maxConcurrent === undefined ? 1 : _ref$maxConcurrent,
        promiseCb = _ref.promiseCb;
    var promisedTasks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var deferred = arguments[2];

    if (!deferred) {
      deferred = $q.defer();
    } else if (!tasks.length) {
      $q.all(promisedTasks).then(deferred.resolve); // End recursion and resolve deferred
    }

    var mutTasks = [].concat(_toConsumableArray(tasks));
    var toRun = mutTasks.splice(0, maxConcurrent); // Mutate to keep concurrent runs in sync

    toRun.forEach(function (task) {
      try {
        var taskPromise = promiseCb(task).then(function (res) {
          run({ tasks: mutTasks, promiseCb: promiseCb }, promisedTasks, deferred); // recurse on success
          return res;
        }).catch(function (err) {
          run({ tasks: mutTasks, promiseCb: promiseCb }, promisedTasks, deferred); // recurse on failure
          return err;
        });
        promisedTasks.push(taskPromise);
      } catch (e) {
        // very likely that promiseCb is not a promise returning function at this point
        deferred.reject(e);
      }
    });

    return deferred.promise;
  }

  return { run: run };
}

promiseQueue.$inject = ['$q'];

/* harmony default export */ __webpack_exports__["a"] = (promiseQueue);

/***/ })
/******/ ]);
});