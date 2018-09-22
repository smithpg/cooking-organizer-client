import React, { Component } from "react";
import styled from "styled-components";
import posed from "react-pose";

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

const Style = styled(PosedDiv)`
  /* opacity: 0; */
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3), 0px 0px 10px rgba(0, 0, 0, 0.1);

  padding: 1rem;
  margin: 5px;
  border-radius: 3px;

  background-color: white;

  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    transition: opacity 100ms;
    box-sizing: border-box;

    background-color: #38ff60;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3),
      inset 0px 0px 15px 3px rgba(255, 255, 255, 0.3);
    z-index: -1;
    opacity: 0;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }

  h1 {
    display: inline;
    font-size: 1.2rem;
    margin: 1rem 0;
    margin-right: 5px;
  }

  button {
  }

  .delete {
    color: #ff3860;
  }

  .edit {
    color: #6038ff;
  }

  .ingredient {
    text-transform: capitalize;
  }
`;

const Recipe = ({
  recipe,
  triggerEdit,
  handleDelete,
  handleHover,
  pose,
  delay
}) => (
  <Style
    onMouseEnter={handleHover.bind(null, recipe)}
    onMouseLeave={handleHover.bind(null, null)}
    pose={pose}
    delay={delay}
    key={recipe.id}
  >
    <div>
      <h1>{recipe.title}</h1>
      <DeleteButton onClick={() => handleDelete(recipe.id)} />
      <EditButton onClick={triggerEdit.bind(null, recipe.id)} />
    </div>

    <ol>
      {recipe.ingredients.map((ingredient, i) => (
        <li key={i} className="ingredient">
          {ingredient}
        </li>
      ))}
    </ol>
  </Style>
);

export default Recipe;
