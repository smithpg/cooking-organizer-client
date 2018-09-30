import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./dashboard.module.scss";

import * as pantryActions from "../store/actions/pantryItems";
import * as recipeActions from "../store/actions/recipes";

import PantryItemForm from "./pantryItemForm";
import PantryItemContainer from "./pantryItemContainer";
import RecipeForm from "./recipeForm";
import RecipeContainer from "./recipeContainer";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchRecipes(this.props.currentUser.id);
    this.props.fetchPantryItems(this.props.currentUser.id);
  }

  render() {
    const { createPantryItem, createRecipe, currentUser } = this.props;

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
          <RecipeContainer className={styles.container__body} />
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
