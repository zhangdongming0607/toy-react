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
    if (count % 2 === 0) {
      return (
        <div>
          <List>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </List>
        </div>
      );
    } else {
      return (
        <span>
          <List>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </List>
        </span>
      );
    }
  }
}

DOMRender(<Demo />, document.querySelector("#root"));
