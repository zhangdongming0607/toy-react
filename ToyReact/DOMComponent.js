import instantiateComponent from "./instantiateComponent";

class DOMComponent {
  constructor(element) {
    this._currentElement = element;
    this._domNode = null;
  }

  renderComponent() {
    const renderedElement = document.createElement(this._currentElement.type);
    // todo: properties

    this._domNode = renderedElement;
    this._renderChildren();

    // debugger
    return renderedElement;
  }

  //todo: 列表优化
  mountChildren(parentNode, element) {
    const children = Array.isArray(element)  ? element : [element];
    const listNode = document.createDocumentFragment();
    for (const child of children) {
      if (typeof child === "string" || typeof child === "number") {
        const textNode = document.createTextNode(children);
        listNode.appendChild(textNode);
      } else if(Array.isArray(child)) {
          this.mountChildren(listNode, child)
      } else {
        const renderedInstance = instantiateComponent(child);
        const node = renderedInstance.renderComponent();
        listNode.appendChild(node);
      }
    }
    parentNode.appendChild(listNode)
  }

  _renderChildren() {
    const children = this._currentElement.props.children;
    this.mountChildren(this._domNode, children)
  }
}

export default DOMComponent;
