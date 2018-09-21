import React, { Component } from "react";

import Input from "./input";
import Button from "./button";

class PantryItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: 1
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState({
      name: "",
      quantity: 1
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          name="name"
          placeholder="Add an item..."
          value={this.state.name}
          autoComplete="off"
          onChange={this.onChange}
        />
        <label htmlFor="quantity">Quantity</label>
        <Input
          type="number"
          name="quantity"
          placeholder="0"
          value={this.state.quantity}
          autoComplete="off"
          onChange={this.onChange}
          rem="4"
        />
        <Button>Add</Button>
      </form>
    );
  }
}

export default PantryItemForm;
