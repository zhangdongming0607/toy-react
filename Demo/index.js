import ToyReact, { Component, DOMRender } from "ToyReact";
import List from "./List";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  render() {
    const { count } = this.state;
    return (
      <List>
        <div>
          <div>1</div>
          <div>2</div>
          <div>{count}</div>
        </div>
      </List>
    );
  }
}

DOMRender(<Demo />, document.querySelector("#root"));
