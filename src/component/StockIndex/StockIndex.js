import React, { useEffect, useState } from "react";
import { getStockIndex } from "../../api/fromApi";
// import styles from 'StockIndex.module.css'

 const StockIndex= ()=> {
  const [stockIndex, setStockIndex] = useState([]); //[index, diff]
  const [indexColor, setIndexColor] = useState("");
  const [indexDate, setIndexDate] = useState("");
  useEffect(() => {
    const getDate = () => {
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

      setStockIndex([result.index[1], result.index[3]]);
      setIndexDate(result.date);
      setIndexColor(result.index[2]);
    };
    stockindex();
  }, []);

  return (
    <div
      className="row align-items-center justify-content-center"
      style={{ height: "100%" }}
    >
      {/* <p className="my-0 px-5 text-left ">{new Date().toLocaleDateString()}</p> */}

      <h1
        className={[
          indexColor.includes("red") ? "text-danger" : "text-success",
          "mx-3",
          "col-md-12 col-5",
        ].join(" ")}
      >
        {stockIndex[0]}
      </h1>
      {indexColor.includes("red") ? (
        <i className="fas fa-angle-up"></i>
      ) : (
        <i className="fas fa-angle-down"></i>
      )}
      <span
        className={indexColor.includes("red") ? "text-danger" : "text-success"}
      >
        {stockIndex[1]}
      </span>
    </div>
  );
}
export default StockIndex