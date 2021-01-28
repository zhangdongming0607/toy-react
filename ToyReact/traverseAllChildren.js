const SEPERATOR = ".";
const SUB_SEPERATOR = ":";

const getComponentKey = (component, index) => {
  return index.toString(36);
};

function traverseAllChildren(children, addToHashTree, traverseContext) {
  return traverseAllChildrenImpl(children, "", addToHashTree, traverseContext);
}

const traverseAllChildrenImpl = (
  children,
  nameSoFar,
  addToHashTree,
  context
) => {
  if (!Array.isArray(children)) {
    addToHashTree(
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
      addToHashTree,
      context
    );
  });
  return subTreeCount;
};

export default traverseAllChildren;
