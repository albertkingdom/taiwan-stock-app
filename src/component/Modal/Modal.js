import React from "react";
import styles from "./Modal.module.css";
const modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div id="myModal" className={styles.modal}>
      <div className={styles.modalcontent}>
        <span className={styles.close} onClick={() => props.toClose()}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  );
};

export default modal;
