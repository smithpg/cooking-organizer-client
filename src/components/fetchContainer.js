import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import LoadingSpinner from "./loadingSpinner";

/**
 * This component is intended to contain fetched content. On initial render,
 * it should be empty. When it receives the fetched content as props, it
 * changes its pose to "fetched" after a short delay, and the pose propogates
 * to its children.
 */

const PosedDiv = posed.div({
  fetched: {
    staggerChildren: 200,
    x: 0
  },
  fetching: {}
});

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.children.length > 0 && this.state.fetching) {
      setTimeout(() => this.setState({ fetching: false }), 200);
    }
  }

  render() {
    const { className } = this.props,
      { fetching } = this.state;

    return (
      <PosedDiv className={className} pose={fetching ? "fetching" : "fetched"}>
        {this.props.children}
      </PosedDiv>
    );
  }
}

export default Container;
