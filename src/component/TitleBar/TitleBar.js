import React from "react";
import styles from "./TitleBar.module.css";

export default function TitleBar() {
  return (
    <div className={styles.titleBar}>
      <ul>
        <li></li>
        <li>股票代號</li>
        <li>股價</li>
        <li>股數</li>
        <li>平均成本</li>
        <li>損益</li>
      </ul>
    </div>
  );
}
