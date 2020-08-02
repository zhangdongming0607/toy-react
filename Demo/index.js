import ToyReact, { Component, DOMRender } from "ToyReact";
import List from "./List";

class Demo extends Component {
  render() {
    return (
      <div>
        <span>Demo</span>
        <List>
          <span>123</span>
          <List>
            <span>123</span>
          </List>
          <List>
            <span>123</span>
          </List>
        </List>
      </div>
    );
  }
}

DOMRender(<Demo />, document.querySelector("#root"));
