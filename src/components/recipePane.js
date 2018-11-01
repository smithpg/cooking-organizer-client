import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import styles from "./recipePane.module.scss";
import { connect } from "react-redux";

import * as recipeActions from "../store/actions/recipes";
import { highlightMatchingPantryItems } from "../store/actions/pantryItems";

import Modal from "./modal";
import Recipe from "./recipe";
import { CreateButton } from "./button";
import RecipeForm from "./recipeForm";
import Input from "./input";

class RecipePane extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleHover = this.handleHover.bind(this);

    this.boundDeleteRecipe = this.props.deleteRecipe.bind(
      this,
      this.props.currentUser.id
    );
  }

  openModal() {
    this.setState({ ...this.state, modal: true });
  }

  closeModal() {
    this.setState({ ...this.state, modal: false });
  }

  handleHover(recipe) {
    const { hoverRecipe, highlightMatchingPantryItems } = this.props;

    if (recipe) {
      // dispatch two actions...
      hoverRecipe(recipe);
      highlightMatchingPantryItems(recipe.ingredients);
    } else {
      hoverRecipe(null);
      highlightMatchingPantryItems(null);
    }
  }

  render() {
    const { createRecipe, currentUser, recipes } = this.props,
      { modal } = this.state;

    return (
      <div className={styles.RecipePane}>
        <header>
          <h1>My Recipes</h1>
          <CreateButton onClick={this.openModal}>New Recipe</CreateButton>
        </header>
        <section>
          <PoseGroup animateOnMount>
            {modal && (
              <Modal closeModal={this.closeModal} headerText="Add Recipes">
                <RecipeForm
                  handleSubmit={createRecipe.bind(null, currentUser.id)}
                />
              </Modal>
            )}
            {recipes.map(item => (
              <Recipe
                key={item.id}
                recipe={item}
                handleDelete={this.boundDeleteRecipe}
                handleHover={this.handleHover}
              />
            ))}
          </PoseGroup>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    recipes: state.recipes.items,
    fetching: state.recipes.fetching,
    errors: state.errors,
    hoveredRecipe: state.recipes.hovered
  };
}

export default connect(
  mapStateToProps,
  {
    ...recipeActions,
    highlightMatchingPantryItems
  }
)(RecipePane);
