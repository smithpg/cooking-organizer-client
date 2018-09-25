import React from "react";
import styled from "styled-components";

import styles from "./input.module.scss";
// console.log("style =", style);
// const Style = styled.input`
// width: ${props => Number(props.rem) + 0.5 + "rem" || "auto"};

// padding: 0.5rem;
// margin: 5px;
// border: none;
// border-radius: 2px;
// box-shadow: inset 0 -0.125rem 0 0 #c4c4c4, inset 0 0 0 1px #c4c4c4,
//   0px 0px 5px transparent;

// letter-spacing: 0.1rem;
// color: inherit;

// transition: all 200ms;
// &:focus,
// &:hover {
//   box-shadow: inset 0 -0.125rem 0 0 #c4c4c4, inset 0 -2px 0 1px #c4c4c4,
//     0px 0px 5px #ffde03;
//   outline: none;
// }

// &::selection {
//   background: #ffde03;
// }
// `;

const Input = props => {
  // const { helpText, labelText } = props;
  return <input {...props} className={styles.input} />;
};

export default Input;
