import React from "react";

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

export const CreateButton = props => (
  <button {...props} className={styles.create}>
    {props.children}
    <FontAwesomeIcon icon={faPlusCircle} />
  </button>
);

export const DeleteButton = props => (
  <button {...props} className={styles.delete}>
    <FontAwesomeIcon icon={faTrash} />
  </button>
);

export const EditButton = props => (
  <button {...props} className={styles.edit}>
    <FontAwesomeIcon icon={faEdit} />
  </button>
);

export const CloseButton = props => (
  <button {...props} className={styles.close}>
    <FontAwesomeIcon icon={faTimes} />
  </button>
);
