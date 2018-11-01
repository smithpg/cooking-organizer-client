import React, { Component } from "react";
import { connect } from "react-redux";
import posed from "react-pose";

import * as recipeActions from "../store/actions/recipes";
import { highlightMatchingPantryItems } from "../store/actions/pantryItems";

import styles from "./recipe.module.scss";

import RecipeForm from "./recipeForm";
import Button, { EditButton, DeleteButton } from "./button";

const ExpandableContainer = posed.div({
  contracted: {
    height: 0,
    overflow: "hidden"
  },

  expanded: {
    height: "auto"
  }
});

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };

    this.triggerEdit = this.triggerEdit.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  triggerEdit() {
    this.props.editRecipe(this.props.recipe.id);
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  handleMouseEnter() {
    const { recipe, highlightMatchingPantryItems } = this.props;

    highlightMatchingPantryItems(recipe.ingredients);
    this.setState({ expanded: true });
  }

  handleMouseLeave() {
    const { highlightMatchingPantryItems } = this.props;

    highlightMatchingPantryItems(null);
    this.setState({ expanded: false });
  }

  render() {
    const { expanded } = this.state;
    const {
      recipe,
      hostRef,
      handleDelete,
      editRecipe,
      updateRecipe,
      currentUser
    } = this.props;

    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={hostRef}
        className={styles.Recipe}
      >
        {recipe.editing ? (
          <RecipeForm
            recipe={recipe}
            handleSubmit={objToSubmit => {
              updateRecipe(currentUser.id, recipe.id, objToSubmit);
            }}
            isEditForm
          />
        ) : (
          <React.Fragment>
            <header>
              <h1>{recipe.title}</h1>
              <DeleteButton onClick={() => handleDelete(recipe.id)} />
              <EditButton onClick={this.triggerEdit} />
            </header>

            <ExpandableContainer pose={expanded ? "expanded" : "contracted"}>
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i} className={styles.ingredient}>
                  {ingredient}
                </li>
              ))}
            </ExpandableContainer>
          </React.Fragment>
        )}
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
)(
  posed(Recipe)({
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
  })
);
