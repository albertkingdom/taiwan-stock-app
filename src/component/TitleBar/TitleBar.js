import React, { useEffect } from "react";
import styles from "./TitleBar.module.css";

function TitleBar({ sortMethod, toSetSortMethod }) {
  return (
    <div className={styles.titleBar}>
      <ul>
        <li></li>
        <li></li>
        <li>
          股票
          {sortMethod === "" || !sortMethod.includes("No") ? (
            <button onClick={() => toSetSortMethod("stockNoAsc")}>
              <i className="fas fa-sort"></i>
            </button>
          ) : null}
          {sortMethod === "stockNoAsc" ? (
            <button onClick={() => toSetSortMethod("stockNoDesc")}>
              <i className="fas fa-sort-up"></i>
            </button>
          ) : null}
          {sortMethod === "stockNoDesc" ? (
            <button onClick={() => toSetSortMethod("")}>
              <i className="fas fa-sort-down"></i>
            </button>
          ) : null}
        </li>
        <li>
          股價
          {sortMethod === "" || !sortMethod.includes("Price") ? (
            <button onClick={() => toSetSortMethod("stockPriceAsc")}>
              <i className="fas fa-sort"></i>
            </button>
          ) : null}
          {sortMethod === "stockPriceAsc" ? (
            <button onClick={() => toSetSortMethod("stockPriceDesc")}>
              <i className="fas fa-sort-up"></i>
            </button>
          ) : null}
          {sortMethod === "stockPriceDesc" ? (
            <button onClick={() => toSetSortMethod("")}>
              <i className="fas fa-sort-down"></i>
            </button>
          ) : null}
        </li>
        <li>股數</li>
        <li>平均成本</li>
        <li>損益</li>
      </ul>
    </div>
  );
}

export default React.memo(TitleBar);
