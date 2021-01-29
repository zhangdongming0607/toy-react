export const UPDATE_TYPES = {
  INSERT: 1,
  MOVE: 2,
  REMOVE: 3,
};

export const OPERATIONS = {
  insert(node, afterNode) {
    return {
      type: UPDATE_TYPES.INSERT,
      content: node,
      afterNode: afterNode,
    };
  },

  move(component, afterNode) {
    return {
      type: UPDATE_TYPES.MOVE,
      fromIndex: component._mountIndex,
      afterNode: afterNode,
    };
  },

  remove(node) {
    return {
      type: UPDATE_TYPES.REMOVE,
      fromNode: node,
    };
  },
};
