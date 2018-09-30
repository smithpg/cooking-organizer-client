import React from "react";

import styles from "./input.module.scss";

const Input = props => {
  const { helpText, labelText } = props;
  return <input {...props} className={styles.Input} />;
};

export default Input;
