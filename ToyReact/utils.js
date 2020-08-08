export const shouldUpdateComponent = (prevElement, nextElement) => {
  return prevElement.type === nextElement.type;
};

export const refreshComponent = (component, nextElement) => {
  if (component._currentElement === nextElement) return;
  return component.updateComponent(component._currentElement, nextElement);
};
