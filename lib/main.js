const DOMNodeCollection = require('./dom_node_collection.js');
const Promise = require('es6-promise').Promise;

const queue = [];

function $l(selector) {

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

  // document.addEventListener("DOMContentLoaded", (e) => {
  //   queue.forEach((func) => {
  //     func();
  //   });
  // });
}

window.$l = $l;

$l.extend = function(...objects) {
  return Object.assign(...objects);
};

$l.ajax = function(options) {
  let defaults = {
    success(data) { JSON.parse('Success'); },
    error() { JSON.parse("An error occurred");},
    url: 'https://dog.ceo/api/breeds/image/random',
    method: 'GET',
    data: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  const mergedCall = Object.assign(defaults, options);

  return new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(mergedCall.method, mergedCall.url);

    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
        console.log(xhr.response);
      } else {
        console.log(xhr.status);
        console.log(xhr.responseType);
      }
    };

    xhr.send(mergedCall.data);
  }).then( () => console.log('this was promised'));
};


const submitForm = (e) => {
  e.preventDefault();
  let description = $l('.description');
  $l('.notepad').append(`<li>${description.val()}</li>`);
  $l('.submit-button').on('click', (e) => {
    submitForm(e);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  $l('.submit-button').on('click', (e) => {
    submitForm(e);
  });
  $l('.todo-form').on('submit', (e) => {
    submitForm(e);
  });
});

module.exports = $l;
