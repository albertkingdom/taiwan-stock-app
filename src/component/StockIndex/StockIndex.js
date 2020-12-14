import React, { useEffect, useState } from "react";
import { getStockIndex } from "../../api/fromApi";
// import styles from 'StockIndex.module.css'

const StockIndex = () => {
  const [stockIndex, setStockIndex] = useState(); //[大盤index, diff]

  useEffect(() => {
    //取得今日大盤指數，after 2pm
    const getDate = () => {
      //if Saturday or Sunday, get Friday info instead
      if (new Date().getDay() === 6) {
        return new Date(Date.now() - 864e5)
          .toLocaleDateString()
          .replace(/\//g, "");
      } else if (new Date().getDay() === 0) {
        return new Date(Date.now() - 2 * 864e5)
          .toLocaleDateString()
          .replace(/\//g, "");
      }
      //Monday morning
      if (new Date().getDay() === 1 && new Date().getHours() < 14) {
        return new Date(Date.now() - 3 * 864e5)
          .toLocaleDateString()
          .replace(/\//g, "");
      }
      //if today's info is not published,then get yesterday's info instead
      if (new Date().getHours() >= 14) {
        return new Date().toLocaleDateString().replace(/\//g, "");
      } else {
        return new Date(Date.now() - 864e5)
          .toLocaleDateString()
          .replace(/\//g, "");
      }
    };
    const stockindex = async () => {
      const result = await getStockIndex(getDate());

      setStockIndex(result);
    };
    stockindex();
  }, []);

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
