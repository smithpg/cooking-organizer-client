import React, { Component } from "react";
import { connect } from "react-redux";

import * as recipeActions from "../store/actions/recipes";
import { highlightMatchingPantryItems } from "../store/actions/pantryItems";

import styles from "./recipeExpanded.module.scss";

import RecipeForm from "./recipeForm";
import Button, { EditButton, DeleteButton, TrashButton } from "./button";

class RecipeExpanded extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      recipe,
      hostRef,
      handleDelete,
      handleEdit,
      handleCollapse
    } = this.props;

    return (
      <div ref={hostRef} className={styles.RecipeExpanded}>
        <header>
          <span className={styles.cancel}>
            <DeleteButton onClick={handleCollapse} large />
          </span>
          <h1>{recipe.title}</h1>
          <div className={styles.buttons}>
            <TrashButton onClick={() => handleDelete(recipe.id)}>
              Delete Recipe
            </TrashButton>
            <EditButton onClick={() => handleEdit(recipe.id)}>
              Edit Recipe
            </EditButton>
          </div>
        </header>
        {recipe.ingredients.map((ingredient, i) => (
          <li key={i} className={styles.ingredient}>
            {ingredient}
          </li>
        ))}
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
)(RecipeExpanded);
