import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import styles from "./recipePane.module.scss";
import { connect } from "react-redux";

import * as recipeActions from "../store/actions/recipes";
import {
  highlightMatchingPantryItems,
  removeHighlights
} from "../store/actions/pantryItems";

import Recipe from "./recipe";
import RecipeExpanded from "./recipeExpanded";
import { CreateButton } from "./button";
import RecipeForm from "./recipeForm";
import Input from "./input";

const AnimatedContainer = posed.section({
  enter: {
    opacity: 1,
    x: 0,
    transition: "linear",
    duration: 2000
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: "linear",
    duration: 2000
  }
});

class RecipePane extends Component {
  componentDidUpdate(prevProps) {
    const {
      highlightMatchingPantryItems,
      removeHighlights,
      recipes
    } = this.props;

    if (
      this.props.recipeInFocus &&
      this.props.recipeInFocus != prevProps.recipeInFocus
    ) {
      const recipeInFocusObj = recipes.find(
        element => element.id == this.props.recipeInFocus
      );

      highlightMatchingPantryItems(recipeInFocusObj.ingredients);
    } else if (!this.props.recipeInFocus && prevProps.recipeInFocus) {
      removeHighlights();
    }
  }

  deleteRecipe = recipeId => {
    this.props.deleteRecipe(this.props.currentUser.id, recipeId);
  };

  expandRecipe = recipe => {
    this.props.expandRecipe(recipe.id);
  };

  submitFormNew = objToSubmit => {
    this.props.createRecipe(this.props.currentUser.id, objToSubmit);
  };

  submitFormEdit = (recipeId, objToSubmit) => {
    this.props.updateRecipe(this.props.currentUser.id, recipeId, objToSubmit);
  };

  render() {
    const {
      recipes,
      newRecipe,
      editRecipe,
      returnToListView,
      finishEdit,
      recipePaneView,
      recipeInFocus
    } = this.props;

    const recipeInFocusObj = recipes.find(
      element => element.id == recipeInFocus
    );

    let currentView;

    switch (recipePaneView) {
      case "LIST":
        currentView = (
          <AnimatedContainer key="list">
            {recipes.map(item => (
              <Recipe
                key={item.id}
                recipe={item}
                handleDelete={this.deleteRecipe}
                handleExpand={this.expandRecipe}
              />
            ))}
          </AnimatedContainer>
        );
        break;
      case "EXPANDED":
        currentView = (
          <AnimatedContainer key="expanded-view">
            <RecipeExpanded
              recipe={recipeInFocusObj}
              handleDelete={this.deleteRecipe}
              handleEdit={editRecipe}
              handleCollapse={returnToListView}
            />
          </AnimatedContainer>
        );
        break;
      case "EDIT":
        currentView = (
          <AnimatedContainer key="form-edit">
            <RecipeForm
              handleSubmit={this.submitFormEdit.bind(null, recipeInFocus)}
              closeForm={finishEdit}
              recipe={recipeInFocusObj}
            />
          </AnimatedContainer>
        );
        break;
      case "NEW_RECIPE":
        currentView = (
          <AnimatedContainer key="form-new">
            <RecipeForm
              handleSubmit={this.submitFormNew}
              closeForm={returnToListView}
            />
          </AnimatedContainer>
        );
    }

    return (
      <div className={styles.RecipePane}>
        <header>
          <h1>My Recipes</h1>
          <CreateButton onClick={newRecipe}>New Recipe</CreateButton>
        </header>
        <div>
          <PoseGroup animateOnMount>{currentView}</PoseGroup>
        </div>
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
    recipeInFocus: state.recipes.recipeInFocus,
    recipePaneView: state.recipes.recipePaneView
  };
}

export default connect(
  mapStateToProps,
  {
    ...recipeActions,
    highlightMatchingPantryItems,
    removeHighlights
  }
)(RecipePane);
