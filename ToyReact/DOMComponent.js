import instantiateComponent from "./instantiateComponent";
import instantiateChildren from './instantiateChildren'

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
  mountChildren(parentNode, children) {
    const childrenInstance = instantiateChildren(children)
    console.log(childrenInstance)
    const listNode = document.createDocumentFragment();
    for (const child of children) {
      if (typeof child === "string" || typeof child === "number") {
        const textNode = document.createTextNode(child);
        listNode.appendChild(textNode);
      } else if (Array.isArray(child)) {
        this.mountChildren(listNode, child);
      } else {
        const renderedInstance = instantiateComponent(child);
        const node = renderedInstance.renderComponent();
        listNode.appendChild(node);
      }
    }
    parentNode.appendChild(listNode);
  }

  updateComponent(prevElement, nextElement) {
    this._currentElement = nextElement;
    //todo: update properties
    this._updateChildren(prevElement.props, nextElement.props);
  }

  _renderChildren() {
    const children = this._currentElement.props.children;
    this.mountChildren(this._domNode, children);
  }

  _updateChildren(prevProps, nextProps) {
    const prevType = typeof prevProps.children;
    const nextType = typeof nextProps.children;

    if (!nextType) return;

    if (nextType === "string" || nextType === "number") {
      this._domNode.textContent = nextProps.children;
    } else {
      //todo: updateChildren
      this._domNode.innerHTML = "";
      this.mountChildren(this._domNode, nextProps.children);
    }
  }
}

export default DOMComponent;
