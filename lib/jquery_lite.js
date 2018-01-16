/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const queue = [];

window.$l = function (selector) {

  if (selector instanceof Function) {
    queue.push(selector);
  } else if (selector instanceof HTMLElement) {
    let element = selector;
    return new DOMNodeCollection([element]);
  } else {
    let element = document.querySelectorAll(selector);
    const elementArray = Array.from(element);
    return new DOMNodeCollection(elementArray);
  }

  document.addEventListener("DOMContentLoaded", (e) => {
    queue.forEach((func) => {
      func();
    });
  });

};

window.$l.extend = function(...objects) {
  return Object.assign(...objects);
};

window.$l.ajax = function(options) {
  let defaults = {
    success(data) { JSON.parse('Success'); },
    error() { JSON.parse("An error occurred");},
    url: 'https://dog.ceo/api/breed/bulldog/french/images',
    method: 'GET',
    data: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  const mergedCall = Object.assign(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(mergedCall.method, mergedCall.url);

  xhr.onload = function() {
    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(xhr.response);
  };

  xhr.send(mergedCall.data);
};

// $l( () => {
//   alert('the document is ready');
// });


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlEls) {
    this.htmlEls = htmlEls;
    // const alert1 = ((e) => alert("Handler1"));
    // const alert2 = ((e) => alert("Handler2"));
    // this.on("click", alert1);
    // this.on("click", alert2);
    // this.off("click", alert1);
    //
  }

  each(callback) {
    this.htmlEls.forEach(callback);
  }

  html(string) {
    if (!string) {
      return this.htmlEls[0].innerHTML;
    } else {
      this.htmlEls.forEach((node) => {
        node.innerHTML = string;
      });
    }
  }

  empty() {
    this.htmlEls.forEach((node) => {
      node.innerHTML = "";
    });
  }

  append(arg) {
    this.htmlEls.forEach( (node) => {
      node.innerHTML += arg;
    });
  }

  attr(attrName, newValue) {
    if (typeof newValue === "string") {
      this.each(node => node.setAttribute(attrName, newValue));
    } else {
      return this.nodes[0].getAttribute(attrName);
    }
  }

  addClass(className) {
    this.htmlEls.forEach ( (node) => {
      node.classList.add(className);
    });
  }

  removeClass(className) {
    this.htmlEls.forEach ( (node) => {
      node.classList.remove(className);
    });
  }

  children() {
    let result = [];

    this.htmlEls.forEach( (node) => {
      let nodeChildren = node.children;
      result = result.concat(Array.from(nodeChildren));
    });

    return new DOMNodeCollection(result);
  }

  parent() {
    let result = [];

    this.htmlEls.forEach( (node) => {
      let nodeParent = node.parentNode;
      if (!result.includes(nodeParent)) {
        result.push(nodeParent);
      }
    });

    return new DOMNodeCollection(result);
  }


  find(selector) {
    let result = [];

    this.htmlEls.forEach( (node) => {
      let elementList = node.querySelectorAll(selector);
      let elArray = Array.from(elementList);
      result = result.concat(elArray);
    });

    return new DOMNodeCollection(result);
  }

  remove() {
    this.empty();
    this.htmlEls = [];
  }

  on (e, handler) {
    this.htmlEls.forEach( (node) => {
      node.addEventListener(e, handler);
      node.eventHandler = handler;
    });
  }

  off (e) {
    this.htmlEls.forEach( (node) => {
      node.removeEventListener(e, node.eventHandler);
    });
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);