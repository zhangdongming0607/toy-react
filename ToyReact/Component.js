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

    this.props = nextElement.props;
    this.state = this._pendingState;
    this._pendingState = null;

    const prevRenderedElement = this._renderedComponent._currentElement;
    const nextRenderedElement = this.render();

    // 如果类型相同，就直接更新
    if (shouldUpdateComponent(prevRenderedElement, nextRenderedElement)) {
      refreshComponent(this._renderedComponent, nextRenderedElement);
    } else {
      // 否则就 remount
      this.unmountComponent(this._renderedComponent); // 卸载掉之前的
      const nextRenderedComponent = instantiateComponent(nextRenderedElement);
      const prevDOMNode = this._renderedComponent._domNode;
      this._renderedNode = nextRenderedComponent.renderComponent();
      replaceNode(prevDOMNode, this._renderedNode);
    }
    this._currentElement = nextRenderedElement;
    this._renderedComponent._currentElement = nextRenderedElement;
    this._renderedComponent._domNode = this._renderedNode;
  }
}

export default Component;
