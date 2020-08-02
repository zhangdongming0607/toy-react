import DOMComponent from "./DOMComponent";
import Component from "./Component";

// instantiateComponent 的目的是将 Element 转化为 Component
// 这一步并没有摸到 DOM
const instantiateComponent = (element) => {
  const { props } = element;
  let componentInstance;
  if (typeof element === "string" || typeof element === "number") {
    /**
     * 纯文本组件
     * todo: 不额外加 span 的实现
     **/
    return new DOMComponent({ type: "span", props: { children: element } });
  } else if (typeof element.type === "string") {
    // DOM element
    return new DOMComponent(element);
  } else if (typeof element.type === "function") {
    // Composite Component
    return new element.type(element);
  }
  return componentInstance;
};

export default instantiateComponent;
