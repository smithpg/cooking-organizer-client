import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import styled from "styled-components";
import { connect } from "react-redux";
import _ from "lodash";

import * as pantryActions from "../store/actions/pantryItems";

import PantryItem from "./pantryItem";
import Input from "./input";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  width: 50vw;
`;

const PosedItem = posed.span({
  preEnter: {
    opacity: 0,
    x: props => props.i * Math.floor(-100 * Math.random()),
    y: -200
  },

  enter: {
    opacity: 1,
    x: 0,
    y: 0
    // transition: { type: "spring", stiffness: 200 }
  },
  exit: {
    opacity: 0
    // x: props => props.i * Math.floor(-100 * Math.random()),
    // y: props => props.i * Math.floor(-100 * Math.random())
  }
});

const ItemList = ({ items, handleDelete }) => (
  <PoseGroup animateOnMount preEnterPose="preEnter">
    {items.map((item, i) => (
      <PosedItem key={item.id} i={i}>
        <PantryItem
          item={item}
          handleDelete={handleDelete}
          highlighted={item.highlighted}
        />
      </PosedItem>
    ))}
  </PoseGroup>
);

class PantryItemContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };

    this.filterByQuery = this.filterByQuery.bind(this);
    this.shiftHighlighted = this.shiftHighlighted.bind(this);
    this.onChange = this.onChange.bind(this);

    this.boundDeletePantryItem = this.props.deletePantryItem.bind(
      null,
      this.props.currentUser.id
    );
  }

  shiftHighlighted(items) {
    return _.flatten(_.partition(items, i => i.highlighted));
  }

  filterByQuery(items) {
    return items.filter(item =>
      item.name.toUpperCase().includes(this.state.query.toUpperCase())
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { arrayFunctions, functionIndex } = this.state,
      { pantryItems } = this.props;

    return (
      <React.Fragment>
        <div>
          <label htmlFor="query">Filter By:</label>
          <Input name="query" type="text" onChange={this.onChange} />
        </div>
        <Container>
          <ItemList
            items={this.shiftHighlighted(this.filterByQuery(pantryItems))}
            handleDelete={this.boundDeletePantryItem}
          />
        </Container>
      </React.Fragment>
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
