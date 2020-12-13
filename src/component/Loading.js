import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center w-100">
      <div className={styles["lds-facebook"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
