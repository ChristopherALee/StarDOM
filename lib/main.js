const DOMNodeCollection = require('./dom_node_collection.js');

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
    url: 'http://www.google.com',
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
//   console.log($l("li"));
// });
