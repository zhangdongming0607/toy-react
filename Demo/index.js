import ToyReact, { Component, DOMRender } from "ToyReact";

class Demo extends Component {
  render() {
    return (
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}

DOMRender(123, document.querySelector('#root'))
