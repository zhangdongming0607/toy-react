import instantiateComponent from "./instantiateComponent";

const render = (element, node) => {
  mount(element, node);
};

const mount = (element, parent) => {
  const componentInstance = instantiateComponent(element);
  const node = componentInstance.mountComponent();

  //todo: children
  parent.appendChild(node);
};

export default render;
