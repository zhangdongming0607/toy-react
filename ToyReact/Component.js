import instantiateComponent from "./instantiateComponent";
import { replaceNode } from "./DOM";
import { shouldUpdateComponent, refreshComponent } from "./utils";

class Component {
  constructor(element) {
    this._currentElement = element;
    // 不好说这么写会不会有问题
    this.props = element.props;
    this._pendingState = null;
    this._renderedComponent = null;
    // this.props =
    // console.log(props)
    // debugger
  }

  setState(partialState) {
    this._pendingState = Object.assign({}, this.state, partialState);
    this.updateComponent(this._currentElement, this._currentElement);
  }

  construct(element) {
    this._currentElement;
  }

  renderComponent(nextRenderedElement) {
    const renderedElement = nextRenderedElement ?? this.render();
    this._renderedComponent = instantiateComponent(renderedElement);
    this._renderedNode = this._renderedComponent.renderComponent();
    return this._renderedNode;
  }

  unmountComponent() {
    // 所以这个函数是干啥的😂
  }

  updateComponent(prevElement, nextElement) {
    //todo?: componentWillReceiveProps
    this._currentElement = nextElement;
    this.state = this._pendingState;

    const prevRenderedElement = this._renderedComponent._currentElement;
    const nextRenderedElement = this.render();
    if (shouldUpdateComponent(prevRenderedElement, nextRenderedElement)) {
      refreshComponent(this._renderedComponent, nextRenderedElement)
    } else {
      this.unmountComponent(this._renderedInstance);
      const nextRenderedComponent = instantiateComponent(nextRenderedElement);
      const prevDOMNode = this._renderedComponent._domNode
      this._renderedNode = this.renderComponent(nextRenderedElement)
      replaceNode(prevDOMNode, this._renderedNode)
    }
  }
}

export default Component;
