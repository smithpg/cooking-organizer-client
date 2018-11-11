import React, { Component } from "react";
import posed from "react-pose";

import styles from "./recipe.module.scss";

import Button, { DeleteButton } from "./button";

const Recipe = ({ recipe, handleExpand, handleDelete, hostRef }) => (
  <button
    ref={hostRef}
    className={styles.Recipe}
    onClick={() => handleExpand(recipe)}
  >
    <h1>{recipe.title}</h1>
  </button>
);

export default Recipe;
