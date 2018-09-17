import React from "react";
import styled from "styled-components";

const Style = styled.input`
  padding: 0.1rem;
  height: 50px;
  border: 0px;
  border-radius: 2px;
  box-shadow: inset 0 -0.125rem 0 0 #c4c4c4, inset 0 0 0 1px #c4c4c4,
    0 0 5px 0 transparent;
  color: inherit;

  transition: all 200ms;
  &:focus,
  &:hover {
    box-shadow: inset 0 -0.125rem 0 0 #c4c4c4, inset 0 -2px 0 1px #c4c4c4,
      0 0 5px 0 rgba(0, 200, 255, 1);
    outline: none;
  }

  &::selection {
    background: rgba(0, 200, 255, 1);
  }
  position: relative;  
    &::after{
      content: "asdfasdf";
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      border-radius: inherit;
      box-sizing: border-box;
      background-color: black;
      z-index: 2;
    }
  /* ${props => `
    position: relative;
    &::after{
        content: "";
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        z-index: 2;
        border: 5px solid black;
    }
  `}


  ${props =>
    props.labelText &&
    `
    
    position: relative;
    &::after{
        content: ${props.labelText},
        height: 100%;
        width: 100%;
        position: absolute;
    }`}; */
`;

const Input = props => {
  const { helpText, labelText } = props;
  return <Style props autoComplete="off" />;
};

export default Input;
