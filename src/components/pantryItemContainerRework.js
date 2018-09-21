import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import styled from "styled-components";
import { connect } from "react-redux";
import _ from "lodash";

import * as pantryActions from "../store/actions/pantryItems";

import Input from "./input";
// import PantryItem from "./pantryItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import Button from "./button";

const Container = styled.div`
  height: 500px;

  * {
    transform-style: preserve-3d;
  }

  .itemList {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
    height: 80%;
    width: 50vw;

    div {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      margin: 5px 5px 10px 5px;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5),
        0px 0px 10px rgba(0, 0, 0, 0.1);
      background-color: white;

      position: relative;
      /* transition: all 200ms ease-in-out; */

      /* z-index: ${props => (props.highlighted ? 2 : 0)}; */
      .name {
        margin: 0px 5px;
        text-transform: uppercase;
      }

      .query-match {
        background-color: yellow;
      }

      .quantity {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: -0.5rem;
        top: -0.5rem;
        padding: 0.1rem;
        color: white;
        font-size: 1.1rem;
        font-weight: bold;

        border-radius: 3px;
        text-shadow: 1px 0px 1px rgba(0, 0, 0, 1), -1px 0px 1px rgba(0, 0, 0, 1);
      }
    }

    &:last-child {
      background-color: red;
    }
  }

  .queryInput {
    padding: 1.5rem;
    height: 20%;
    border-radius: 10px;
    border-bottom: 2px dashed #eeeeee;
    border-right: 2px dashed #eeeeee;
    border-left: 2px dashed #eeeeee;
  }
`;

const PantryItem = ({ item, handleDelete, highlighted, query, hostRef }) => (
  <div ref={hostRef}>
    <Button className="delete-btn" onClick={e => handleDelete(item.id)}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
    <span className="name">{item.name}</span>
    <span className="quantity">x{item.quantity}</span>
  </div>
);

const PosedItem = posed(PantryItem)({
  preEnter: {
    opacity: 0
    // x: props => props.i * Math.floor(-100 * Math.random()),
    // y: -200
  },

  enter: {
    opacity: 1
    // x: 0,
    // y: 0,
    // transition: { type: "spring", stiffness: 200 }
  },
  exit: {
    opacity: 0
    // x: props => props.i * Math.floor(-100 * Math.random()),
    // y: props => props.i * Math.floor(-100 * Math.random())
  }
});

// const PosedItem = posed.span({
//   preEnter: {
//     opacity: 0
//     // x: props => props.i * Math.floor(-100 * Math.random()),
//     // y: -200
//   },

//   enter: {
//     opacity: 1
//     // x: 0,
//     // y: 0
//     // transition: { type: "spring", stiffness: 200 }
//   },
//   exit: {
//     opacity: 0
//     // x: props => props.i * Math.floor(-100 * Math.random()),
//     // y: props => props.i * Math.floor(-100 * Math.random())
//   }
// });

const ItemList = ({ items, handleDelete, query }) => (
  <PoseGroup animateOnMount preEnterPose="preEnter">
    {items.map((item, i) => (
      <PosedItem item={item} key={item.id} i={i}>
        {/* <PosedItem key={item.id} i={i}> */}
        {/* <PantryItem
          item={item}
          handleDelete={handleDelete}
          highlighted={item.highlighted}
          query={query}
        /> */}
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
    const { pantryItems } = this.props;

    return (
      <React.Fragment>
        <Container>
          <div className="queryInput">
            <label htmlFor="query">Filter Items:</label>
            <Input
              name="query"
              type="text"
              onChange={this.onChange}
              placeholder="..."
            />
          </div>
          <div className="itemList">
            <ItemList
              items={this.shiftHighlighted(this.filterByQuery(pantryItems))}
              handleDelete={this.boundDeletePantryItem}
              query={this.state.query}
            />
          </div>
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
