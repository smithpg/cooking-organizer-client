import React, { Component } from "react";

import styles from "./recipe.module.scss";

import { EditButton, DeleteButton } from "./button";

const Recipe = ({ recipe, triggerEdit, handleDelete, handleHover }) => (
  <div
    onMouseEnter={handleHover.bind(null, recipe)}
    onMouseLeave={handleHover.bind(null, null)}
    key={recipe.id}
    className={styles.Recipe}
  >
    <div>
      <h1>{recipe.title}</h1>
      <DeleteButton onClick={() => handleDelete(recipe.id)} />
      <EditButton onClick={triggerEdit.bind(null, recipe.id)} />
    </div>

    <ul>
      {recipe.ingredients.map((ingredient, i) => (
        <li key={i} className={styles.ingredient}>
          {ingredient}
        </li>
      ))}
    </ul>
  </div>
);

export default Recipe;
