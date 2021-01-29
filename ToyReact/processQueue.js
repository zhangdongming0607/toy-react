import { UPDATE_TYPES } from "./operations";
import { insertAfter, removeChild } from "./DOM";

// this is responsible for the real updates of the diffing tree
export default function processQueue(parentNode, updates) {
  updates.forEach((update) => {
    switch (update.type) {
      case UPDATE_TYPES.INSERT: {
        insertAfter(parentNode, update.content, update.afterNode?._domNode);
        break;
      }

      case UPDATE_TYPES.MOVE:
        // this automatically removes and inserts the new child
        insertAfter(parentNode, update.content, update.afterNode?._domNode);
        break;

      case UPDATE_TYPES.REMOVE:
        removeChild(parentNode, update.fromNode?._domNode);
        break;

      default:
        assert(false);
    }
  });
}
