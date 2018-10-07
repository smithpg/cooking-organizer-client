import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import styles from "./pantryItemContainer.module.scss";
import { connect } from "react-redux";
import _ from "lodash";

import * as pantryActions from "../store/actions/pantryItems";

import Input from "./input";
import PantryItem from "./pantryItem";

// const PosedItem = posed(PantryItem)({
//   enter: {
//     opacity: 1
//   },
//   exit: {
//     opacity: 0
//   }
// });

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
    opacity: 1
  },
  exit: {
    opacity: 0
  }
});

const ItemList = ({ items, handleDelete, query }) => (
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
      <div className={styles.PantryItemContainer}>
        <div className={styles.queryInput}>
          <label htmlFor="query">Filter Items:</label>
          <Input
            name="query"
            type="text"
            onChange={this.onChange}
            placeholder="..."
          />
        </div>
        <div className={styles.itemList}>
          <ItemList
            items={this.filterByQuery(pantryItems)}
            handleDelete={this.boundDeletePantryItem}
            query={this.state.query}
          />
        </div>
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
