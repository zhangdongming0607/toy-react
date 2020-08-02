import ToyReact, { Component } from "ToyReact";

export default class List extends Component {
  render() {
    const {children} = this.props
    return (
      <div>
        <div>this is a List</div>
        {children}
      </div>
    );
  }
}
