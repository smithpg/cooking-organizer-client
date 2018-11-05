import React, { Component } from "react";
import { connect } from "react-redux";
import { PoseGroup } from "react-pose";

import styles from "./dashboard.module.scss";
import { joinClasses } from "../services/classUtils";
import * as pantryActions from "../store/actions/pantryItems";
import * as recipeActions from "../store/actions/recipes";

import RecipePane from "./recipePane";
import PantryItemPane from "./pantryItemPane";

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

    return (
      <div className={styles.Dashboard}>
        <RecipePane
          className={joinClasses(styles.container, styles.containerLeft)}
        />
        <PantryItemPane
          className={joinClasses(styles.container, styles.containerRight)}
        />
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
