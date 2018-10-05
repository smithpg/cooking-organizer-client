import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import styles from "./recipeContainer.module.scss";
import { connect } from "react-redux";

import * as recipeActions from "../store/actions/recipes";
import { highlightMatchingPantryItems } from "../store/actions/pantryItems";

import Recipe from "./recipe";
import RecipeForm from "./recipeForm";
import Input from "./input";

const PosedItem = posed.span({
  preEnter: {
    opacity: 0,
    y: -200
  },
  enter: {
    opacity: 1,
    y: 0,
    delay: props => props.i * 100,
    transition: { type: "spring", stiffness: 200 }
  },

  exit: {
    opacity: 0
  }
});

class RecipeContainer extends Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);

    this.boundDeleteRecipe = this.props.deleteRecipe.bind(
      null,
      this.props.currentUser.id
    );
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
    const {
      deleteRecipe,
      editRecipe,
      updateRecipe,
      currentUser,
      recipes
    } = this.props;

    return (
      <div className={styles.RecipeContainer}>
        <PoseGroup animateOnMount preEnterPose="preEnter">
          {recipes.map((item, i) => (
            <PosedItem key={item.id} i={i}>
              {item.editing ? (
                <RecipeForm
                  handleSubmit={objToSubmit => {
                    updateRecipe(currentUser.id, item.id, objToSubmit);
                  }}
                  title={item.title}
                  key={item.id + "form"}
                  ingredients={item.ingredients}
                  isEditForm={true}
                />
              ) : (
                <Recipe
                  key={item.id}
                  recipe={item}
                  triggerEdit={editRecipe}
                  handleDelete={deleteRecipe.bind(null, currentUser.id)}
                  handleHover={this.handleHover}
                />
              )}
            </PosedItem>
          ))}
        </PoseGroup>
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
)(RecipeContainer);
