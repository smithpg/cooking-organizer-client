import React, { Component } from "react";
import posed from "react-pose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { joinClasses } from "../services/classUtils.js";

import styles from "./pantryItem.module.scss";

import { DeleteButton } from "./button";

const Checkmark = posed.span({
  hidden: {
    opacity: 0,
    scale: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1.1,
    y: 0,
    transition: {
      y: { type: "spring", stiffness: 500 }
    }
  }
});

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
    className={
      highlighted
        ? joinClasses(styles.PantryItem, styles.highlighted)
        : styles.PantryItem
    }
  >
    <Checkmark
      className={styles.Checkmark}
      pose={highlighted ? "visible" : "hidden"}
    >
      <FontAwesomeIcon icon={faCheckCircle} />
    </Checkmark>
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
