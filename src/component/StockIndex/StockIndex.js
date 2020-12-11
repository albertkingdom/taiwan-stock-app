import React, { useEffect, useState } from "react";
// import { getStockIndex } from "../../api/fromApi";
// import styles from 'StockIndex.module.css'

const StockIndex = ({ stockIndex }) => {
  if (!stockIndex) {
    //if stockIndex還沒取得內容就先不render
    return null;
  }
  return (
    <div
      className="row align-items-center justify-content-center"
      style={{ height: "100%" }}
    >
      <h1
        className={[
          stockIndex.index[2].includes("red") ? "text-danger" : "text-success",
          "mx-3",
          "col-md-12 col-6 text-center",
        ].join(" ")}
      >
        {stockIndex.index[1]}
      </h1>

      {stockIndex.index[2].includes("red") ? (
        <i className="fas fa-angle-up"></i>
      ) : (
        <i className="fas fa-angle-down"></i>
      )}
      <span
        className={
          stockIndex.index[2].includes("red") ? "text-danger" : "text-success"
        }
      >
        {stockIndex.index[3]}
      </span>
    </div>
  );
};
export default React.memo(StockIndex);
