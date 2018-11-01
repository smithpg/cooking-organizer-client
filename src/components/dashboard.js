import React, { Component } from "react";
import { connect } from "react-redux";
import { PoseGroup } from "react-pose";

import styles from "./dashboard.module.scss";
import { joinClasses } from "../services/classUtils";
import * as pantryActions from "../store/actions/pantryItems";
import * as recipeActions from "../store/actions/recipes";

import { CreateButton } from "./button";
import Modal from "./modal";
import PantryItemForm from "./pantryItemForm";
import PantryItemContainer from "./pantryItemContainer";
import RecipeForm from "./recipeForm";
import RecipeContainer from "./recipeContainer";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalName) {
    this.setState({ modal: modalName });
  }

  closeModal() {
    this.setState({ modal: null });
  }

  componentDidMount() {
    this.props.fetchRecipes(this.props.currentUser.id);
    this.props.fetchPantryItems(this.props.currentUser.id);
  }

  render() {
    const { modal } = this.state;
    const { createPantryItem, createRecipe, currentUser } = this.props;

    let currentModal = null;
    if (modal === "create-recipe") {
      currentModal = (
        <Modal closeModal={this.closeModal} headerText="Add Recipes">
          <RecipeForm handleSubmit={createRecipe.bind(null, currentUser.id)} />
        </Modal>
      );
    } else if (modal === "create-pantry-item") {
      currentModal = (
        <Modal closeModal={this.closeModal} headerText="Add Recipes">
          <PantryItemForm
            handleSubmit={createPantryItem.bind(null, currentUser.id)}
          />
        </Modal>
      );
    }

    return (
      <div className={styles.Dashboard}>
        <PoseGroup>{currentModal}</PoseGroup>

        <div className={joinClasses(styles.container, styles.containerLeft)}>
          <header className={styles.container__header}>
            <h1>My Recipes</h1>
            <CreateButton onClick={this.openModal.bind(null, "create-recipe")}>
              New Recipe
            </CreateButton>
          </header>
          <RecipeContainer className={styles.container__body} />
        </div>
        <div className={joinClasses(styles.container, styles.containerRight)}>
          <div className={styles.container__header}>
            <h1>My Pantry</h1>
            <CreateButton
              onClick={this.openModal.bind(null, "create-pantry-item")}
            >
              New Pantry Item
            </CreateButton>
            {/* <PantryItemForm
              handleSubmit={createPantryItem.bind(null, currentUser.id)}
            /> */}
          </div>
          <PantryItemContainer />
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
