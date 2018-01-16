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

  setAttribute(attrName, newValue) {
    for (let i = 0; i < this.htmlEls.length; i++) {
      if (this.htmlEls[i].attributes.getNamedItem(attrName.toLowerCase())) {
        let myAttributes = this.htmlEls[i].attributes;
        let myAttribute = myAttributes.getNamedItem(attrName.toLowerCase());

        if (newValue !== undefined) {
          myAttribute.value = newValue;
        }
          return myAttribute.value;
      }
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
      // debugger
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

  remove () {
    this.empty();
    this.htmlEls = [];
  }

  on (e, handler) {
    this.htmlEls.forEach( (node) => {
      node.addEventListener(e, handler);
    });
  }

  off (e, handler) {
    this.htmlEls.forEach( (node) => {
      node.removeEventListener(e, handler);
    });
  }

}

module.exports = DOMNodeCollection;
