import ToyReact, { Component } from "ToyReact";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  render() {
    const { children } = this.props;
    const { count } = this.state;
    return (
      <div>
        <div>this is a List</div>
        <div>count is {count}</div>
        {children}
      </div>
    );
  }
}
