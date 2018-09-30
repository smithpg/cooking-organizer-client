import React, { Component } from "react";
import posed from "react-pose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./pantryItem.module.scss";

import { DeleteButton } from "./button";

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
        <span className={styles.queryMatch}>
          {name.slice(startIndex, startIndex + query.length)}
        </span>
      );
    } else {
      subSpans.push(<span>{name.slice(startIndex, matchIndex)}</span>);
      subSpans.push(
        <span className={styles.queryMatch}>
          {name.slice(matchIndex, matchIndex + query.length)}
        </span>
      );
    }

    startIndex = matchIndex + query.length;
  }

  return <span className={styles.name}>{subSpans}</span>;
};

const PantryItem = ({ item, handleDelete, highlighted, query }) => (
  <li
    className={[styles.PantryItem, highlighted ? styles.highlighted : ""].join(
      " "
    )}
  >
    <DeleteButton onClick={e => handleDelete(item.id)} />
    {query ? (
      <StyledMatches name={item.name} query={query} />
    ) : (
      <span className={styles.name}>{item.name}</span>
    )}
    <span className={styles.quantity}>x{item.quantity}</span>
  </li>
);

export default PantryItem;
