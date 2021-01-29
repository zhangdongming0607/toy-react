import ToyReact, { Component, DOMRender } from "ToyReact";
import List from "./List";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  render() {
    const { count } = this.state;
    return (
      <List>
        <div>
          <div>a</div>
          <div>b</div>
          {count > 0 ? <div>{count}</div> : <span>{count}</span>}
        </div>
      </List>
    );
  }
}

DOMRender(<Demo />, document.querySelector("#root"));
