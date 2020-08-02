import Component from "./Component";

class DOMComponent extends Component {
  constructor(element) {
    super(element);
    this._domNode = null
  }

  renderComponent() {
    const renderedElement = document.createElement(this._currentElement.type);
    // todo: properties

    this._domNode = renderedElement
    this._renderChildren()

    // debugger
    return renderedElement
  }

  _renderChildren() {
      const children = this._currentElement.props.children
      if(typeof children === 'string' || typeof children === 'number') {
          const textNode = document.createTextNode(children)
          this._domNode.appendChild(textNode)
      }
      //todo: element array
  }
}

export default DOMComponent;
