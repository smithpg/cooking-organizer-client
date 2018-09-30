import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./dashboard.module.scss";
import { posed, PoseGroup } from "react-pose";

import * as pantryActions from "../store/actions/pantryItems";
import * as recipeActions from "../store/actions/recipes";

import Button from "./button";
import PantryItem from "./pantryItem";
import PantryItemForm from "./pantryItemForm";
import PantryItemContainer from "./pantryItemContainer";
import RecipeForm from "./recipeForm";
import Recipe from "./recipe";
import RecipeContainer from "./recipeContainer";

import FetchContainer from "./fetchContainer";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleHover = this.handleHover.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes(this.props.currentUser.id);
    this.props.fetchPantryItems(this.props.currentUser.id);
  }

  handleHover(recipe) {
    const {
      hoverRecipe,
      highlightMatchingPantryItems,
      removeHighlights
    } = this.props;

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
      deletePantryItem,
      deleteRecipe,
      createPantryItem,
      createRecipe,
      hoverRecipe,
      editRecipe,
      finishEditRecipe,
      updateRecipe,
      updatePantryItem,
      highlightPantryItems,
      currentUser,
      recipes,
      pantryItems
    } = this.props;

    const recipesArray = this.props.recipes.items.map(
      (item, index) =>
        item.editing ? (
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
        )
    );
    return (
      <div className={styles.Dashboard}>
        <div className={styles.container}>
          <div className={styles.container__header}>
            <h1>My Pantry</h1>
            <PantryItemForm
              handleSubmit={createPantryItem.bind(null, currentUser.id)}
            />
          </div>
          <PantryItemContainer />
        </div>
        <div className={styles.container}>
          <div className={styles.container__header}>
            <h1>My Recipes</h1>
            <RecipeForm
              handleSubmit={createRecipe.bind(null, currentUser.id)}
            />
          </div>

          <RecipeContainer />

          {/* <FetchContainer className={styles.container__body}>
            {recipesArray}
          </FetchContainer> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    pantryItems: state.pantryItems,
    recipes: state.recipes,
    errors: state.errors
  };
}

export default connect(
  mapStateToProps,
  {
    ...recipeActions,
    ...pantryActions
  }
)(Dashboard);
