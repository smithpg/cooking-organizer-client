import React, { Component } from "react";

import Input from "./input";

class RecipeForm extends Component {
  constructor(props) {
    const { title, ingredients } = props;

    super(props);
    this.state = {
      message: "",
      title: title || "",
      ingredients: ingredients ? ingredients.concat([""]) : [""]
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeIngredient = this.onChangeIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.onSubmitAttempt = this.onSubmitAttempt.bind(this);
  }

  deleteIngredient(e) {
    e.preventDefault();
    e.stopPropagation();
    const ingredientIndex = e.target.parentNode.id;
    const newIngredients = this.state.ingredients.slice();

    newIngredients.splice(ingredientIndex, 1);

    this.setState({
      ...this.state,
      ingredients: newIngredients
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onChangeIngredient(index, e) {
    const newIngredients = this.state.ingredients.slice();

    if (e.target.value === "" && index > 0) {
      // If the text value of an input other than the first
      // has been deleted, remove the input
      newIngredients.splice(index, 1);
    } else {
      newIngredients[index] = e.target.value;

      if (index === this.state.ingredients.length - 1) {
        newIngredients.push("");
      }
    }

    this.setState({ ingredients: newIngredients });
  }

  onSubmitAttempt(e) {
    e.preventDefault();
    const { title, ingredients } = this.state;
    if (title && ingredients[0]) {
      const objToSubmit = {
        title,
        ingredients: ingredients.slice(0, -1) // last field is always empty
      };

      this.props.handleSubmit(objToSubmit);

      // Reset form to initial state
      if (!this.props.isEditForm) {
        this.setState({
          message: "",
          title: "",
          ingredients: [""]
        });
      }
    } else {
      // Set message to indicate missing field
      this.setState({
        message: "Recipe must have a title and at least one ingredient!"
      });
    }
  }

  render() {
    const ingredientInputs = this.state.ingredients.map((ingredient, index) => (
      <li key={index} id={index}>
        <input
          type="text"
          className="ingredient"
          placeholder="...add an ingredient"
          key={index}
          value={this.state.ingredients[index]}
          onChange={this.onChangeIngredient.bind(this, index)}
        />
        {ingredient ? (
          <button onClick={this.deleteIngredient}>Delete</button>
        ) : null}
      </li>
    ));

    return (
      <form onSubmit={this.onSubmitAttempt}>
        <Input
          type="text"
          name="title"
          helpText={this.state.message}
          value={this.state.title}
          onChange={this.onChange}
          placeholder="Recipe Title"
        />
        {/* <input 
                    type="text" 
                    name="title" 
                    value={this.state.title}
                    onChange={this.onChange}
                /> */}
        <label htmlFor="ingredients">Ingredients</label>
        <ol>{ingredientInputs}</ol>
        <button>Add</button>
      </form>
    );
  }
}

export default RecipeForm;
