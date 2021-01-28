import traverseAllChildren from "./traverseAllChildren";
import instantiateComponent from "./instantiateComponent";

const instantiateChild = (child, name, childInstances) => {
  if (!childInstances[name]) {
    childInstances[name] = instantiateComponent(child);
  }
};

const instantiateChildren = (children) => {
  const childrenHashTree = {}; // children hash tree
  traverseAllChildren(children, instantiateChild, childrenHashTree);
  return childrenHashTree;
};

export default instantiateChildren;
