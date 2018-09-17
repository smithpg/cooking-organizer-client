import React, { Component } from "react";

import Input from "./input";

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
          labelText="test text"
          value={this.state.name}
          autoComplete="on"
          onChange={this.onChange}
        />
        {/* <input 
                    type="text" 
                    name="name" 
                    placeholder="Add an item..."
                    value={this.state.name}
                    onChange={this.onChange}
                /> */}
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={this.state.quantity}
          onChange={this.onChange}
        />
        <button>Add</button>
      </form>
    );
  }
}

export default PantryItemForm;
