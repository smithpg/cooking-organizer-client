import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import * as pantryActions from "../store/actions/pantryItems";
import * as recipeActions from "../store/actions/recipes";

import LoadingSpinner from "./loadingSpinner";
import PantryItemForm from "./pantryItemForm";
import RecipeForm from "./recipeForm";
import Recipe from "./recipe";

const Style = styled.div`
  margin-top: 40px;
  height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem;

  .container {
    height: 100%;

    flex: 300px 1 1;
    margin: 0px 5px;
    background-color: white;
  }

  form {
    width: 100%;
    padding: 1.5rem;

    /* background-color: blanchedalmond; */

    * {
      margin-right: 3px;
    }
  }

  ul {
    width: 100%;
    list-style: none;
    overflow-y: auto;
  }

  .highlighted {
    background-color: green;
  }

  li {
    padding: 0.25rem 1rem;
    border-bottom: 1px solid #eeeeee;

    button {
      margin-right: 1rem;
      border-radius: 50%;
      padding: 0.5rem;
      border: none;
    }
  }
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchRecipes(this.props.currentUser.id);
    this.props.fetchPantryItems(this.props.currentUser.id);
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

    console.log(recipes);
    const pantryItemsArray = this.props.pantryItems.items.map(item => {
      let isHighlighted = "";
      if (recipes.hovered) {
        const itemIsIngredient = recipes.hovered.ingredients.some(
          ingredient => ingredient.toUpperCase() === item.name.toUpperCase()
        );
        if (itemIsIngredient) isHighlighted = "highlighted";
      }

      return (
        <li id={item.id} key={item.id} className={isHighlighted}>
          <button
            className="delete-btn"
            onClick={e => deletePantryItem(item.id, this.props.currentUser.id)}
          >
            X
          </button>
          {item.name}
        </li>
      );
    });

    const recipesArray = this.props.recipes.items.map(
      (item, index) =>
        item.editing ? (
          <RecipeForm
            handleSubmit={objToSubmit => {
              updateRecipe(currentUser.id, item.id, objToSubmit);
            }}
            title={item.title}
            ingredients={item.ingredients}
            isEditForm={true}
          />
        ) : (
          <Recipe
            key={item.id}
            recipe={item}
            triggerEdit={editRecipe}
            handleDelete={deleteRecipe.bind(null, currentUser.id)}
            setHover={hoverRecipe}
          />
        )
    );

    return (
      <Style>
        {pantryItems.fetching || recipes.fetching ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
            <div className="container">
              <PantryItemForm
                handleSubmit={createPantryItem.bind(null, currentUser.id)}
              />
              <ul>{pantryItemsArray}</ul>
            </div>
            <div className="container">
              <RecipeForm
                handleSubmit={createRecipe.bind(null, currentUser.id)}
              />
              <ul>{recipesArray}</ul>
            </div>
          </React.Fragment>
        )}
      </Style>
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
