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

"use strict";


var DOMNodeCollection = __webpack_require__(1);

var queue = [];

function $l(selector) {

  if (selector instanceof Function) {
    queue.push(selector);
  } else if (selector instanceof HTMLElement) {
    var element = selector;
    return new DOMNodeCollection([element]);
  } else {
    var _element = document.querySelectorAll(selector);
    var elementArray = Array.from(_element);
    return new DOMNodeCollection(elementArray);
  }
}

window.$l = $l;

$l.extend = function () {
  return Object.assign.apply(Object, arguments);
};

$l.ajax = function (options) {
  var defaults = {
    success: function success(data) {
      JSON.parse('Success');
    },
    error: function error() {
      JSON.parse("An error occurred");
    },

    url: 'https://dog.ceo/api/breeds/image/random',
    method: 'GET',
    data: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  var mergedCall = Object.assign(defaults, options);

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(mergedCall.method, mergedCall.url);

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
        console.log(xhr.response);
      } else {
        console.log(xhr.status);
        console.log(xhr.responseType);
      }
    };

    xhr.send(mergedCall.data);
  }).then(function () {
    return console.log('this was promised');
  });
};

module.exports = $l;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMNodeCollection = function () {
  function DOMNodeCollection(htmlEls) {
    _classCallCheck(this, DOMNodeCollection);

    this.htmlEls = htmlEls;
  }

  _createClass(DOMNodeCollection, [{
    key: "each",
    value: function each(callback) {
      this.htmlEls.forEach(callback);
    }
  }, {
    key: "html",
    value: function html(string) {
      if (!string) {
        return this.htmlEls[0].innerHTML;
      } else {
        this.htmlEls.forEach(function (node) {
          node.innerHTML = string;
        });
      }
    }
  }, {
    key: "empty",
    value: function empty() {
      this.htmlEls.forEach(function (node) {
        node.innerHTML = "";
      });
    }
  }, {
    key: "append",
    value: function append(arg) {
      if (arg instanceof DOMNodeCollection) {
        this.htmlEls.forEach(function (node) {
          arg.each(function (argNode) {
            node.appendChild(argNode.cloneNode(true));
            argNode.remove();
          });
        });
      } else {
        this.htmlEls.forEach(function (node) {
          node.innerHTML += arg;
        });
      }
    }
  }, {
    key: "attr",
    value: function attr(attrName, newValue) {
      if (typeof newValue === "string") {
        this.each(function (node) {
          return node.setAttribute(attrName, newValue);
        });
      } else {
        return this.nodes[0].getAttribute(attrName);
      }
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      this.htmlEls.forEach(function (node) {
        node.classList.add(className);
      });
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this.htmlEls.forEach(function (node) {
        node.classList.remove(className);
      });
    }
  }, {
    key: "children",
    value: function children() {
      var result = [];

      this.htmlEls.forEach(function (node) {
        var nodeChildren = node.children;
        result = result.concat(Array.from(nodeChildren));
      });

      return new DOMNodeCollection(result);
    }
  }, {
    key: "parent",
    value: function parent() {
      var result = [];

      this.htmlEls.forEach(function (node) {
        var nodeParent = node.parentNode;
        if (!result.includes(nodeParent)) {
          result.push(nodeParent);
        }
      });

      return new DOMNodeCollection(result);
    }
  }, {
    key: "find",
    value: function find(selector) {
      var result = [];
      debugger;
      this.htmlEls.forEach(function (node) {
        debugger;
        var elementList = node.querySelectorAll(selector);
        var elArray = Array.from(elementList);
        result = result.concat(elArray);
      });
      debugger;
      return new DOMNodeCollection(result);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.each(function (node) {
        return node.parentNode.removeChild(node);
      });
    }
  }, {
    key: "on",
    value: function on(e, handler) {
      this.htmlEls.forEach(function (node) {
        node.addEventListener(e, handler);
        node.eventHandler = handler;
      });
    }
  }, {
    key: "off",
    value: function off(e) {
      this.htmlEls.forEach(function (node) {
        node.removeEventListener(e, node.eventHandler);
      });
    }
  }, {
    key: "val",
    value: function val() {
      return this.htmlEls[0].value;
    }
  }]);

  return DOMNodeCollection;
}();

module.exports = DOMNodeCollection;

/***/ })
/******/ ]);
//# sourceMappingURL=stardom.js.map