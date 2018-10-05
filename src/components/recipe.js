import React, { Component } from "react";
import { connect } from "react-redux";
import posed from "react-pose";

import * as recipeActions from "../store/actions/recipes";
import { highlightMatchingPantryItems } from "../store/actions/pantryItems";

import styles from "./recipe.module.scss";

import Button, { EditButton, DeleteButton } from "./button";

const ExpandableContainer = posed.div({
  contracted: {
    height: 0
  },

  expanded: {
    height: "auto"
  }
});

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  handleMouseEnter() {
    const { recipe, hoverRecipe, highlightMatchingPantryItems } = this.props;

    // hoverRecipe(recipe);
    highlightMatchingPantryItems(recipe.ingredients);
    this.setState({ expanded: true });
  }

  handleMouseLeave() {
    const { hoverRecipe, highlightMatchingPantryItems } = this.props;

    // hoverRecipe(null);
    highlightMatchingPantryItems(null);
    this.setState({ expanded: false });
  }

  render() {
    const { expanded } = this.state;
    const { recipe, triggerEdit, handleDelete, handleHover } = this.props;

    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        key={recipe.id}
        className={styles.Recipe}
      >
        <header>
          <h1>{recipe.title}</h1>
          {/* <Button onClick={this.toggleExpand}>Expand</Button> */}
          <DeleteButton onClick={() => handleDelete(recipe.id)} />
          <EditButton onClick={triggerEdit.bind(null, recipe.id)} />
        </header>

        <ExpandableContainer pose={expanded ? "expanded" : "contracted"}>
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i} className={styles.ingredient}>
              {ingredient}
            </li>
          ))}
        </ExpandableContainer>
        {/* {expanded && (
          <ul>
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className={styles.ingredient}>
                {ingredient}
              </li>
            ))}
          </ul>
        )} */}
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
)(Recipe);
