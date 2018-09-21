import React from "react";
import styled from "styled-components";
import posed from "react-pose";

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
  margin: 0px;
  border: 0px;
  border-radius: 2px;
  box-shadow: inset 0 -0.125rem 0 0 #c4c4c4, inset 0 0 0 1px #c4c4c4,
    0 0 5px 0 transparent;

  letter-spacing: 0.1rem;
  color: ${props => (props.color ? "white" : "inherit")};
  background-color: ${props => props.color || "white"};

  cursor: pointer;

  transition: all 200ms;
  &:focus,
  &:hover {
    box-shadow: inset 0 -0.125rem 0 0 #c4c4c4, inset 0 -2px 0 1px #c4c4c4,
      0 0 5px 0 rgba(0, 200, 255, 1);
    outline: none;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: inset 0 -0.125rem 0 0 #c4c4c4, inset 0 -2px 0 1px #c4c4c4,
      0 0 3px 0 rgba(0, 200, 255, 1);
  }
`;

export default Button;
