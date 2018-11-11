import React, { Component } from "react";
import styles from "./recipeForm.module.scss";

import Input from "./input";
import Button, { DeleteButton } from "./button";

class RecipeForm extends Component {
  constructor(props) {
    super(props);

    const { recipe } = props;

    this.state = {
      message: "",
      title: recipe ? recipe.title : "",
      ingredients: recipe ? recipe.ingredients : []
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

    if (e.target.value === "") {
      // If the text value of an input other than the first
      // has been deleted, remove the input
      newIngredients.splice(index, 1);
    } else {
      newIngredients[index] = e.target.value;
    }

    this.setState({ ingredients: newIngredients });
  }

  onSubmitAttempt(e) {
    e.preventDefault();
    const { title, ingredients } = this.state;
    if (title && ingredients[0]) {
      const objToSubmit = {
        title,
        ingredients
      };

      this.props.handleSubmit(objToSubmit);

      // Reset form to initial state
      if (!this.props.recipe) {
        this.setState({
          message: "",
          title: "",
          ingredients: []
        });
      }
    } else {
      // Set message to indicate missing fields
      this.setState({
        message: `Recipe must have ${title ? "" : "a title"}${
          !(title || ingredients.length) ? " and" : ""
        }${ingredients.length ? "" : " at least one ingredient"}!`
      });
    }
  }

  render() {
    const { ingredients } = this.state,
      ingredientInputs = ingredients.map((ingredient, index) => (
        <li key={index}>
          <Input
            type="text"
            className="ingredient"
            placeholder="..."
            autoComplete="off"
            value={ingredients[index]}
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
    ingredientInputs.push(
      <li key={ingredients.length}>
        <Input
          type="text"
          className="ingredient"
          placeholder="..."
          autoComplete="off"
          value=""
          onChange={this.onChangeIngredient.bind(null, ingredients.length)}
        />
      </li>
    );

    return (
      <div className={styles.RecipeForm}>
        <header>
          <h3>{this.props.recipe ? "Edit Recipe" : "Add a New Recipe"}</h3>
          <span className={styles.cancel}>
            <DeleteButton onClick={this.props.closeForm} large />
          </span>
          {this.state.message ? (
            <div className={styles.formErrorMessage}>
              <DeleteButton
                className={styles.dismiss}
                onClick={this.dismissError}
              />
              {this.state.message}
            </div>
          ) : null}
        </header>

        <form onSubmit={this.onSubmitAttempt}>
          <div>
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
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients</label>
            <ol>{ingredientInputs}</ol>
          </div>

          <Button>{this.props.recipe ? "Update" : "Add"}</Button>
        </form>
      </div>
    );
  }
}

export default RecipeForm;
