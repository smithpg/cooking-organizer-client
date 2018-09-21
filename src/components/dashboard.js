import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { posed, PoseGroup } from "react-pose";

import * as pantryActions from "../store/actions/pantryItems";
import * as recipeActions from "../store/actions/recipes";

import Button from "./button";
import PantryItem from "./pantryItem";
import PantryItemForm from "./pantryItemForm";
import PantryItemContainer from "./pantryItemContainer";
import RecipeForm from "./recipeForm";
import Recipe from "./recipe";
import FetchContainer from "./fetchContainer";

const Style = styled.div`
  margin-top: 40px;
  height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem;
  padding-bottom: 0;
  perspective: 1000px;
  .container {
    display: flex;
    flex-direction: column;

    height: 100%;
    padding-bottom: 1rem;

    flex: 300px 1 1;
    margin: 0px 5px;
  }
  .container__header {
    /* border-radius: 2px; */
  }
  .container__body {
    overflow-y: scroll;
    flex-grow: 1;
  }

  .container__body--pantry {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;

    padding: 1rem;
    perspective: 1000px;
  }

  .container__body form {
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3), 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin: 5px;
    border-radius: 3px;

    background-color: white;
  }

  label {
    margin-right: 0.5rem;
    text-transform: uppercase;
  }

  /* .container__header form { */
  form {
    /* width: 100%; */
    padding: 1.5rem;

    border-radius: 10px;
    border: 2px dashed #eeeeee;

    input {
      margin-right: 1rem;
    }
  }

  ul {
    width: 100%;
    list-style: none;
  }

  .highlighted {
    transform: scale(2);
  }

  .ingredient {
    margin-left: 10px;
  }
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleHover = this.handleHover.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes(this.props.currentUser.id);
    this.props.fetchPantryItems(this.props.currentUser.id);
    // setTimeout(() => {
    // }, 3000);
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
      <Style>
        <div className="container">
          <div className="container__header">
            <h1>My Pantry</h1>
            <PantryItemForm
              handleSubmit={createPantryItem.bind(null, currentUser.id)}
            />
          </div>
          <PantryItemContainer />
        </div>
        <div className="container">
          <div className="container__header">
            <h1>My Recipes</h1>
            <RecipeForm
              handleSubmit={createRecipe.bind(null, currentUser.id)}
            />
          </div>

          <FetchContainer className="container__body">
            {recipesArray}
          </FetchContainer>
        </div>
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
