import React, { Component } from "react";
import styled from "styled-components";
import posed from "react-pose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import Button from "./button";

const Style = styled.li`
  list-style: none;
  width: auto;

  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 5px 10px 5px;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: ${props =>
    props.highlighted
      ? "0px 5px 10px rgba(0, 0, 0, 0.5), 0px 0px 10px rgba(0, 0, 0, 0.1);"
      : "0px 2px 3px rgba(0, 0, 0, 0.3), 0px 0px 10px rgba(0, 0, 0, 0.1);"};
  background-color: ${props => (props.highlighted ? "#38FF60" : "white")};
  position: relative;
  /* transition: all 200ms ease-in-out; */

  z-index: ${props => (props.highlighted ? 2 : 0)};
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
`;

const StyledMatches = ({ name, query }) => {
  let startIndex = 0,
    matchIndex;

  const subSpans = [],
    capsQuery = query.toUpperCase(),
    capsName = name.toUpperCase();

  while (true) {
    matchIndex = capsName.indexOf(capsQuery, startIndex);

    if (matchIndex === -1) {
      if (startIndex != name.length) {
        subSpans.push(<span>{name.slice(startIndex)}</span>);
      }

      break;
    }

    if (matchIndex === startIndex) {
      subSpans.push(
        <span className="query-match">
          {name.slice(startIndex, startIndex + query.length)}
        </span>
      );
    } else {
      subSpans.push(<span>{name.slice(startIndex, matchIndex)}</span>);
      subSpans.push(
        <span className="query-match">
          {name.slice(matchIndex, matchIndex + query.length)}
        </span>
      );
    }

    startIndex = matchIndex + query.length;
  }

  return <span className="name">{subSpans}</span>;
};

const PantryItem = ({ item, handleDelete, highlighted, query }) => (
  <Style highlighted={highlighted}>
    <Button className="delete-btn" onClick={e => handleDelete(item.id)}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
    {query ? (
      <StyledMatches name={item.name} query={query} />
    ) : (
      <span className="name">{item.name}</span>
    )}
    <span className="quantity">x{item.quantity}</span>
  </Style>
);

export default PantryItem;
