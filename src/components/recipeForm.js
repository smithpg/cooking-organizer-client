import React, { Component } from "react";
import styles from "./recipeForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";

import Input from "./input";
import Button, { DeleteButton } from "./button";

;

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
    this.dismissError = this.dismissError.bind(this);
    this.onSubmitAttempt = this.onSubmitAttempt.bind(this);
  }

  dismissError(e) {
    this.setState({ message: "" });
  }

  deleteIngredient(index, e) {
    e.preventDefault();
    e.stopPropagation();

    const newIngredients = this.state.ingredients.slice();

    newIngredients.splice(index, 1);

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

    if (e.target.value === "" && newIngredients.length > 1) {
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
      // Set message to indicate missing fields
      this.setState({
        message: "Recipe must have a title and at least one ingredient!"
      });
    }
  }

  render() {
    const ingredientInputs = this.state.ingredients.map((ingredient, index) => (
      <li key={index}>
        <Input
          type="text"
          className="ingredient"
          placeholder="..."
          autoComplete="off"
          value={this.state.ingredients[index]}
          onChange={this.onChangeIngredient.bind(null, index)}
        />
        {ingredient ? (
          <DeleteButton
            onClick={this.deleteIngredient.bind(null, index)}
            data-index={index}
          />
        ) : null}
      </li>
    ));

    return (
      <form className= {styles.RecipeForm}  onSubmit={this.onSubmitAttempt}>
        {this.state.message ? (
          <div className="form-error-message">
            <FontAwesomeIcon
              className="dismiss"
              onClick={this.dismissError}
              icon={faWindowClose}
            />
            {this.state.message}
          </div>
        ) : null}

        <label htmlFor="title">Title</label>
        <Input
          type="text"
          name="title"
          autoComplete="off"
          helpText={this.state.message}
          value={this.state.title}
          onChange={this.onChange}
          placeholder="e.g. Tomato Soup"
        />
        {/* <input 
                    type="text" 
                    name="title" 
                    value={this.state.title}
                    onChange={this.onChange}
                /> */}
        <div>
          <label htmlFor="ingredients">Ingredients</label>
          <ol>{ingredientInputs}</ol>
        </div>

        <Button>{this.props.isEditForm ? "Update" : "Add"}</Button>
      </form>
    );
  }
}

export default RecipeForm;
