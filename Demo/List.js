import ToyReact, { Component } from "ToyReact";

export default class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, count } = this.props;
    return (
      <div>
        <div>this is a List</div>
        {children}
      </div>
    );
  }
}
