import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import styles from "./button.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Button = props => (
  <button {...props} className={styles.btn}>
    {props.children}
  </button>
);

export default Button;

export const DeleteButton = props => (
  <button {...props} className={styles.btn + " " + styles.delete}>
    <FontAwesomeIcon icon={faTrash} />
  </button>
);

export const EditButton = props => (
  <button {...props} className={styles.btn + " " + styles.edit}>
    <FontAwesomeIcon icon={faEdit} />
  </button>
);
