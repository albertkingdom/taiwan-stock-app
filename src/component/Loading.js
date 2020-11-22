import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className="">
      <div className={styles["lds-facebook"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
