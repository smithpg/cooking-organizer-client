import React from "react";

import { joinClasses } from "../services/classUtils";

import styles from "./button.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlusCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

const Button = props => (
  <button {...props} className={styles.btn}>
    {props.children}
  </button>
);

export default Button;

export const CreateButton = ({ onClick, children }) => (
  <button onClick={onClick} className={styles.create}>
    {children && <span>{children}</span>}
    <FontAwesomeIcon icon={faPlusCircle} />
  </button>
);

export const DeleteButton = props => (
  <button
    {...props}
    className={
      props.large
        ? joinClasses(styles.delete, styles.deleteLarge)
        : styles.delete
    }
  >
    <FontAwesomeIcon icon={faTimes} />
  </button>
);

export const EditButton = ({ onClick, children }) => (
  <button onClick={onClick} className={styles.edit}>
    {children && <span>{children}</span>}
    <FontAwesomeIcon icon={faEdit} />
  </button>
);

export const TrashButton = ({ onClick, children }) => (
  <button onClick={onClick} className={styles.trash}>
    {children && <span>{children}</span>}
    <FontAwesomeIcon icon={faTrash} />
  </button>
);
