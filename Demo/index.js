import ToyReact, { Component, DOMRender } from "ToyReact";
import List from "./List";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0}
    setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }
  render() {
    return (
      <div>
        count: {this.state.count}
      </div>
    );
  }
}

DOMRender(<Demo />, document.querySelector("#root"));
