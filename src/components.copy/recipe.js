import React, { Component } from "react";
import posed from "react-pose";

import styles from "./recipe.module.scss";

import Button, { EditButton, DeleteButton } from "./button";

const PosedDiv = posed.div({
  initialPose: "fetching",
  fetching: {
    opacity: 0,
    y: -50,
    rotateZ: "5deg"
  },

  fetched: {
    opacity: 1,
    rotateZ: "0deg",
    y: 0,
    transition: { type: "spring", stiffness: 500 }
  }
});

const Recipe = ({
  recipe,
  triggerEdit,
  handleDelete,
  handleHover,
  pose,
  delay
}) => (
  <PosedDiv
    onMouseEnter={handleHover.bind(null, recipe)}
    onMouseLeave={handleHover.bind(null, null)}
    pose={pose}
    delay={delay}
    key={recipe.id}
    className={styles.Recipe}
  >
    <div>
      <h1>{recipe.title}</h1>
      <DeleteButton onClick={() => handleDelete(recipe.id)} />
      <EditButton onClick={triggerEdit.bind(null, recipe.id)} />
    </div>

    <ol>
      {recipe.ingredients.map((ingredient, i) => (
        <li key={i} className={styles.ingredient}>
          {ingredient}
        </li>
      ))}
    </ol>
  </PosedDiv>
);

export default Recipe;
