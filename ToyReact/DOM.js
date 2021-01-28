// DOM 操作相关的 helper
export function empty(node) {
  const { childNodes } = node;
  for (let childNode of childNodes) {
    node.removeChild(childNode);
  }
}

export function replaceNode(prevNode, nextNode) {
  const parent = prevNode.parentNode;
  empty(parent);
  parent.appendChild(nextNode);
}

export function appendChildren(node, children) {
  if (Array.isArray(children)) {
    children.forEach((child) => node.appendChild(child));
  } else {
    node.appendChild(children);
  }
}
