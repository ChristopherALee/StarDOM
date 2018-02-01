# StarDOM

StarDOM is a custom built JavaScript library used for handling event actions, AJAX requests, and manipulation of the DOM. StarDOM features a To-Do application demonstrating the library's flexible abilities to manipulate the DOM.

It features 'Just Do It', a To-Do application demonstrating the library's flexible abilities to manipulate the DOM. You can view the repo and the live demo [here](https://github.com/ChristopherALee/JustDoIt).

## How To Use
1. Clone this repository.
2. If you have an available `index.html` file, write a `<script>` sourcing `stardom.js`.
3. The repo's current WebPack entry file is `main.js`, so you can either use the StarDOM library here or create a new entry file. Either way, it will be compiled into `stardom.js`.
4. The `$l` function would then be available for use to manipulate DOM elements in your html file. You can give `$l` an argument - be it a HTML element, HTML element's className via CSS selector, or HTML element's id via CSS selector within a `string`.
<br>
For example:
``` javascript
$l(".className")
```
This will create the HTML element with a class name of `className` as an instance of `DOMNodeCollection`.
5. Now you will be able to use any of the available DOM manipulation methods under the `DOMNodeCollection` class.

## Features

### Condition-based DOM Selection
Selection is determinant on the instance of the respective selector.
``` javascript
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
}
```

### AJAX Requests
Sets default request parameters to merge with options passed into the function. Creates an XMLHttpRequest and sends the request, returning a promise.
``` javascript
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
```

### Event Handling
`on` and `off` functions to add or remove event listeners on HTML elements.
``` javascript
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
```

### Other available DOM manipulation methods:
``` javascript
html()
each()
empty()
append()
attr()
addClass()
removeClass()
children()
parent()
find()
remove()
val()
```
