import traverseAllChildren from "./traverseAllChildren";

export default function flattenChildren(children) {
  const flattenedChildren = {};
  traverseAllChildren(
    children,
    (child, name, context) => (context[name] = child),
    flattenedChildren
  );
  return flattenedChildren;
}
