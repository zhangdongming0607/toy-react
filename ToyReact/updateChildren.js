import { shouldUpdateComponent, refreshComponent } from "./utils";
import instantiateComponent from "./instantiateComponent";

// 得出需要 insert, remove，和调整顺序的节点
function updateChildren(prevchildren, nextChildren, mountNodes, removeNodes) {
  // prevchildren: instance tree, nextChildren: element tree
  Object.keys(nextChildren).forEach((childKey) => {
    const prevChildComponent = prevchildren[childKey];
    const prevElement =
      prevChildComponent && prevChildComponent._currentElement;
    const nextElement = nextChildren[childKey];
    // 三种情况
    // 1. prev element 存在，类型和 next element 相同
    // 2. prev element 存在，类型和 next element 不同，删除再插入一个新的
    // 3. prev element 不存在, 应该插入一个新的
    if (prevElement && shouldUpdateComponent(prevElement, nextElement)) {
      // just update
      refreshComponent(prevChildComponent, nextElement);
      nextChildren[childKey] = prevChildComponent;
    } else {
      if (prevChildComponent) {
        removeNodes[childKey] = prevChildComponent._domNode;
        prevChildComponent.unmountComponent();
      }
      // insert new child
      const nextComponent = instantiateComponent(nextElement);
      nextChildren[childKey] = nextComponent;
      mountNodes.push(nextComponent.mountComponent());
    }
  });

  // remove old children not exsit
  Object.keys(prevchildren).forEach((childKey) => {
    if (!nextChildren.hasOwnProperty(childKey)) {
      const prevChildComponent = prevchildren[childKey];
      removeNodes[childKey] = prevChildComponent;
      prevChildComponent.unmountComponent();
    }
  });
}

export default updateChildren;
