import React from "react";
import styled from "styled-components";
import posed from "react-pose";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// const PosedButton = posed.button({
//   enter: { y: 0, opacity: 1, delay: 300 },
//   exit: {
//     y: 50,
//     opacity: 0,
//     transition: { duration: 200 }
//   }
// });

const Button = styled.button`
  padding: 0.5rem;
  margin: 2px;
  border: 0px;
  border-radius: 5px;
  box-shadow: inset 0 -0.125rem 0 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 5px 0 transparent;

  letter-spacing: 0.1rem;
  background-color: white;
  color: ${props => props.color || "#333333"};

  cursor: pointer;

  transition: all 200ms;
  &:focus,
  &:hover {
    background-color: ${props => props.color || "#333333"};
    color: white;
    
    /* box-shadow: inset 0 -0.125rem 0 0 rgba(0, 0, 0, 0.1),
      inset 0 -2px 0 1px rgba(0, 0, 0, 0.1),
      0 0 5px 0 ${props => props.color || "rgba(0, 0, 0, 0.1)"}; */
    outline: none;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: inset 0 -0.125rem 0 0 rgba(0, 0, 0, 0.1),
      inset 0 -2px 0 1px rgba(0, 0, 0, 0.1),
      0 0 3px 0 ${props => props.color || "rgba(0, 0, 0, 0.1)"};
  }
`;

export default Button;

export const DeleteButton = props => (
  <Button color="#ff3860" {...props}>
    <FontAwesomeIcon icon={faTrash} />
  </Button>
);

export const EditButton = props => (
  <Button color="#896bff" {...props}>
    <FontAwesomeIcon icon={faEdit} />
  </Button>
);
