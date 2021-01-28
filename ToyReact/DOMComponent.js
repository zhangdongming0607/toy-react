import instantiateComponent from "./instantiateComponent";
import instantiateChildren from "./instantiateChildren";
import { appendChildren } from "./DOM";

class DOMComponent {
  constructor(element) {
    this._currentElement = element;
    this._domNode = null;
    this._renderedChildren = null;
  }

  mountComponent() {
    const renderedElement = document.createElement(this._currentElement.type);
    // todo: properties

    this._domNode = renderedElement;
    // this._renderChildren();
    this._createInitialDOMChildren(this._currentElement.props);

    return renderedElement;
  }

  // //todo: 列表优化
  // mountChildren(parentNode, children) {
  //   const childrenInstance = instantiateChildren(children);
  //   const listNode = document.createDocumentFragment();
  //   for (const child of children) {
  //     if (typeof child === "string" || typeof child === "number") {
  //       const textNode = document.createTextNode(child);
  //       listNode.appendChild(textNode);
  //     } else if (Array.isArray(child)) {
  //       this.mountChildren(listNode, child);
  //     } else {
  //       const renderedInstance = instantiateComponent(child);
  //       const node = renderedInstance.mountComponent();
  //       listNode.appendChild(node);
  //     }
  //   }
  //   parentNode.appendChild(listNode);
  // }

  mountChildren(children) {
    const childrenComponents = instantiateChildren(children);
    this._renderedChildren = childrenComponents; // children hash tree
    const childrenNodes = Object.keys(childrenComponents).map((childKey, i) => {
      const childComponent = childrenComponents[childKey];
      childComponent._mountIndex = i;
      return childComponent.mountComponent();
    });

    return childrenNodes;
  }

  updateComponent(prevElement, nextElement) {
    this._currentElement = nextElement;
    //todo: update properties
    this._updateDOMChildren(prevElement.props, nextElement.props);
  }

  updateChildren(nextChildren) {}

  _renderChildren() {
    const children = this._currentElement.props.children;
    this.mountChildren(this._domNode, children);
  }

  _createInitialDOMChildren(props) {
    if (
      typeof props.children === "string" ||
      typeof props.children === "number"
    ) {
      const textNode = document.createTextNode(props.children);
      this._domNode.appendChild(textNode);
    } else if (props.children) {
      // Single element or Array
      const childrenNodes = this.mountChildren(props.children);
      appendChildren(this._domNode, childrenNodes);
    }
  }

  _updateDOMChildren(prevProps, nextProps) {
    const prevType = typeof prevProps.children;
    const nextType = typeof nextProps.children;

    if (!nextType) return;

    if (nextType === "string" || nextType === "number") {
      this._domNode.textContent = nextProps.children;
    } else {
      //todo: updateChildren
      this.updateChildren(nextProps.children);
      // this._domNode.innerHTML = "";
      // this.mountChildren(this._domNode, nextProps.children);
    }
  }
}

export default DOMComponent;
