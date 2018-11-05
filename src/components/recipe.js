import React, { Component } from "react";
import posed from "react-pose";

import styles from "./recipe.module.scss";

import Button, { DeleteButton } from "./button";

const Recipe = ({ recipe, handleExpand, handleDelete, hostRef }) => (
  <div ref={hostRef} className={styles.Recipe}>
    <header>
      <h1>{recipe.title}</h1>
      {/* <DeleteButton onClick={() => handleDelete(recipe.id)} /> */}
      <Button onClick={() => handleExpand(recipe)}>View</Button>
    </header>
  </div>
);

export default posed(Recipe)({
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
});
