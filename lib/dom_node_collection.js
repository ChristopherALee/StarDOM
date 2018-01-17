class DOMNodeCollection {
  constructor(htmlEls) {
    this.htmlEls = htmlEls;
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

  val() {
    return (
      this.htmlEls[0].value
    );
  }

}

module.exports = DOMNodeCollection;
