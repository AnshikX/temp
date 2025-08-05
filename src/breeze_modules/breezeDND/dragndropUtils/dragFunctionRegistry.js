// dragFunctionRegistry.ts
const dragFnRegistry = new Map();

export const registerDragHandler = (id, onDrop) => {
  dragFnRegistry.set(id, onDrop);
};

export const getDragHandler = (id) => {
  return dragFnRegistry.get(id);
};

export const removeDragHandler = (id) => {
  dragFnRegistry.delete(id);
};
