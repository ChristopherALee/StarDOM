# StarDOM

StarDOM is a custom built JavaScript library used for handling event actions, AJAX requests, and manipulation of the DOM. StarDOM features a To-Do application demonstrating the library's flexible abilities to manipulate the DOM.

Condition-based DOM Selection: Selection is determinant on the instance of the respective selector
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

AJAX Requests: Sets default request parameters to merge with options passed into the function. Creates an XMLHttpRequest and sends the request, returning a promise.
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

Event Handling:
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

See below for code snippet of other available DOM manipulation methods:
``` javascript
class DOMNodeCollection {
  constructor(htmlEls) {
    this.htmlEls = htmlEls;
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
    if (arg instanceof DOMNodeCollection) {
      this.htmlEls.forEach ( (node) => {
        arg.each ( (argNode) => {
          node.appendChild(argNode.cloneNode(true));
          argNode.remove();
        });
      });
    } else {
      this.htmlEls.forEach( (node) => {
        node.innerHTML += arg;
      });
    }
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
    debugger
    this.htmlEls.forEach( (node) => {
      debugger
      let elementList = node.querySelectorAll(selector);
      let elArray = Array.from(elementList);
      result = result.concat(elArray);
    });
    debugger
    return new DOMNodeCollection(result);
  }

  remove() {
    this.each ( (node) => node.parentNode.removeChild(node));
  }

  val() {
    return (
      this.htmlEls[0].value
    );
  }
}
```
