import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import styles from "./pantryItemPane.module.scss";
import { connect } from "react-redux";

import * as pantryActions from "../store/actions/pantryItems";

import Input from "./input";
import { CreateButton } from "./button";
import PantryItemForm from "./pantryItemForm";
import PantryItem from "./pantryItem";

// const PosedItem = posed(PantryItem)({
//   enter: {
//     opacity: 1,
//     scale: 1
//   },
//   exit: {
//     opacity: 0,
//     scale: 0
//   }
// });

// const PosedList = ({ items, handleDelete, query }) => (
//   <PoseGroup>
//     {items.map((item, i) => (
//       <PosedItem
//         key={item.id}
//         i={i}
//         item={item}
//         handleDelete={handleDelete}
//         highlighted={item.highlighted}
//         query={query}
//       />
//     ))}
//   </PoseGroup>
// );

/**
 *  For some reason that is not clear to me, PantryItem components that
 *  have had the posed() function applied to them behave differently from
 *  the same components wrapped inside a posed.span. The posed PantryItems
 *  wait until unmounting components complete exit animations before moving to
 *  their new positions, whereas the posed.spans begin moving as soon as the
 *  exit animations begin. The latter looks much better, so I've stuck with
 *  that.
 */

const PosedSpan = posed.span({
  enter: {
    opacity: 1,
    scale: 1
  },
  exit: {
    opacity: 0,
    scale: 0
  }
});

const PosedList = ({ items, handleDelete, query }) => (
  <PoseGroup>
    {items.map((item, i) => (
      <PosedSpan key={item.id}>
        <PantryItem
          i={i}
          item={item}
          handleDelete={handleDelete}
          highlighted={item.highlighted}
          query={query}
        />
      </PosedSpan>
    ))}
  </PoseGroup>
);

class PantryItemPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };

    this.boundDeletePantryItem = this.props.deletePantryItem.bind(
      null,
      this.props.currentUser.id
    );
  }

  filterByQuery = items => {
    return items.filter(item =>
      item.name.toUpperCase().includes(this.state.query.toUpperCase())
    );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDelete = itemId =>
    this.props.deletePantryItem(this.props.currentUser.id, itemId);

  handleSubmit = objToSubmit => {
    this.props.createPantryItem(this.props.currentUser.id, objToSubmit);
  };

  render() {
    const { pantryItems } = this.props,
      { query } = this.state;

    return (
      <div className={styles.PantryItemPane}>
        <header>
          <h1>My Pantry</h1>
          <PantryItemForm handleSubmit={this.handleSubmit} />
          <div className={styles.queryInput}>
            <label htmlFor="query">Filter Items:</label>
            <Input
              name="query"
              type="text"
              onChange={this.onChange}
              placeholder="..."
            />
          </div>
        </header>
        <section className={styles.itemList}>
          <PosedList
            items={this.filterByQuery(pantryItems)}
            handleDelete={this.handleDelete}
            query={query}
          />
        </section>
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
)(PantryItemPane);
