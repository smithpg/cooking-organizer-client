import React from "react";
import posed from "react-pose";

import { joinClasses } from "../services/classUtils.js";

import styles from "./modal.module.scss";

import { DeleteButton } from "./button";

const ModalContent = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.8
  }
});

const Modal = ({ closeModal, children, headerText, hostRef }) => {
  return (
    <div className={joinClasses(styles.Modal)} ref={hostRef}>
      <ModalContent className={styles.modalContent}>
        <header>
          {headerText}
          <DeleteButton className={styles.closeButton} onClick={closeModal} />
        </header>
        <section>{children}</section>
      </ModalContent>
    </div>
  );
};

export default posed(Modal)({
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
});
