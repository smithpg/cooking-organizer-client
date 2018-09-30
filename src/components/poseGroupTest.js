import React from "react";
import { render } from "react-dom";
import posed, { PoseGroup } from "react-pose";
import styles from "./poseGroupTest.module.scss";
import { connect } from "react-redux";

import * as pantryActions from "../store/actions/pantryItems";

import PantryItem from "./pantryItem";

;
const PosedItem = posed.span({
  enter: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100 }
  },
  exit: {
    opacity: 0,
    // x: -20,
    transition: { type: "spring", stiffness: 100 }
  }
});

const ItemList = ({ items, handleDelete }) => (
  <PoseGroup animateOnMount>
    {items.map(item => (
      <PosedItem key={item.id}>
        <PantryItem
          item={item}
          handleDelete={handleDelete}
          highlighted={false}
        />
      </PosedItem>
      // <PantryItem
      //   item={item}
      //   key={item.id}
      //   handleDelete={handleDelete}
      //   highlighted={false}
      // />
    ))}
  </PoseGroup>
);

class PantryItemContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      functionIndex: 0,
      arrayFunctions: [
        items => items.slice().reverse(),
        items => items.slice().filter(item => item.name[0] === "a"),
        items => items.slice().filter(item => item.name.length < 5)
      ]
    };

    this.boundDeletePantryItem = this.props.deletePantryItem.bind(
      null,
      this.props.currentUser.id
    );
  }

  _shuffle = () => {
    console.log("inside _shuffle");
    this.setState({
      functionIndex: Math.floor(
        Math.random() * this.state.arrayFunctions.length
      )
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    // this.interval = setInterval(this._shuffle, 2000);
  }

  render() {
    const { arrayFunctions, functionIndex } = this.state,
      { pantryItems } = this.props;

    return (
      <div className= {styles.PoseGroupTest} >
        <ItemList
          items={arrayFunctions[functionIndex](pantryItems)}
          handleDelete={this.boundDeletePantryItem}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    pantryItems: state.pantryItems.items,
    fetching: state.pantryItems.fetching,
    errors: state.errors,
    hoveredRecipe: state.recipes.hovered
  };
}

export default connect(
  mapStateToProps,
  {
    ...pantryActions
  }
)(PantryItemContainer);
