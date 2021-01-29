const SEPERATOR = ".";
const SUB_SEPERATOR = ":";

const getComponentKey = (component, index) => {
  return index.toString(36);
};

function traverseAllChildren(children, callback, traverseContext) {
  return traverseAllChildrenImpl(children, "", callback, traverseContext);
}

const traverseAllChildrenImpl = (children, nameSoFar, callback, context) => {
  if (!Array.isArray(children)) {
    callback(
      children,
      nameSoFar + SEPERATOR + getComponentKey(children, 0),
      context
    );
    return 1;
  }
  const namePrefix = !nameSoFar ? SEPERATOR : nameSoFar + SUB_SEPERATOR;
  let subTreeCount = 0;
  children.forEach((child, index) => {
    subTreeCount += traverseAllChildrenImpl(
      child,
      namePrefix + getComponentKey(child, index),
      callback,
      context
    );
  });
  return subTreeCount;
};

export default traverseAllChildren;
