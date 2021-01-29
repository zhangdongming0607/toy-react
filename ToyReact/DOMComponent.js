import instantiateComponent from "./instantiateComponent";
import instantiateChildren from "./instantiateChildren";
import flattenChildren from "./flattenChildren";
import { appendChildren } from "./DOM";
import { shouldUpdateComponent, refreshComponent } from "./utils";
import updateChildren from "./updateChildren";
import { OPERATIONS } from "./operations";
import processQueue from "./processQueue";

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

  unmountComponent() {
    if (!this._renderedChildren) return;
    Object.keys(this._renderChildren).forEach((childKey) => {
      this._renderedChildren[childKey].unmountComponent();
    });
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

  updateChildren(nextChildren) {
    let prevRenderedChildren = this._renderedChildren;
    let nextRenderedChildren = flattenChildren(nextChildren);

    let mountNodes = [];
    let removedNodes = {};

    updateChildren(
      prevRenderedChildren,
      nextRenderedChildren,
      mountNodes,
      removedNodes
    );

    // We'll compare the current set of children to the next set.
    // We need to determine what nodes are being moved around, which are being
    // inserted, and which are getting removed. Luckily, the removal list was
    // already determined by the ChildReconciler.

    // We'll generate a series of update operations here based on the
    // bookmarks that we've made just now
    let updates = [];

    let lastIndex = 0;
    let nextMountIndex = 0;
    let lastPlacedNode = null;

    Object.keys(nextRenderedChildren).forEach((childKey, nextIndex) => {
      let prevChild = prevRenderedChildren[childKey];
      let nextChild = nextRenderedChildren[childKey];

      //todo: 似乎还是全量更新

      if (prevChild === nextChild) {
        // mark this as an update if they are identical
        // We don't actually need to move if moving to a lower index.
        // Other operations will ensure the end result is correct.
        if (prevChild._mountIndex < lastIndex) {
          updates.push(OPERATIONS.move(nextChild, lastPlacedNode));
        }

        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
        prevChild._mountIndex = nextIndex;
      } else {
        // Otherwise we need to record an insertion.
        // First, if we have a prevChild then we know it's a removal.
        // We want to update lastIndex based on that.
        if (prevChild) {
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
        }

        nextChild._mountIndex = nextIndex;
        updates.push(
          OPERATIONS.insert(mountNodes[nextMountIndex], lastPlacedNode)
        );
        nextMountIndex++;
      }

      // keep track of lastPlacedNode
      lastPlacedNode = nextChild._domNode;
    });

    // enque the removal the non-exsiting nodes
    Object.keys(removedNodes).forEach((childKey) => {
      updates.push(
        OPERATIONS.remove(
          prevRenderedChildren[childKey],
          removedNodes[childKey]
        )
      );
    });

    // do the actual updates
    processQueue(this._domNode, updates);

    // at this point, nextRenderedChildren has already become a component tree
    // rather than the original element tree
    this._renderedChildren = nextRenderedChildren;
  }

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
    // const prevType = typeof prevProps.children;
    const nextType = typeof nextProps.children;

    if (!nextType) return;

    if (nextType === "string" || nextType === "number") {
      this._domNode.textContent = nextProps.children;
    } else {
      this.updateChildren(nextProps.children);
      // this._domNode.innerHTML = "";
      // this.mountChildren(this._domNode, nextProps.children);
    }
  }
}

export default DOMComponent;
