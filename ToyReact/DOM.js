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
