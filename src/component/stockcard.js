import React, { useEffect } from "react";
import styles from "./stockcard.module.css";
const Stockcard = ({ name, info, price, show, openModal, isAuth }) => {
  // console.log("stockcard", stocklist);
  // const name = stocklist.keys
  // console.log("stockcard name", name);
  // console.log("stockcard info", info);
  // console.log("stockcard price", price);

  // console.log("stockcard openModal", openModal);

  const calAvgCost = () => {
    //計算每支股票平均成本
    let totalprice = 0;
    let totalamount = 0;

    info.forEach((item) =>
      item.buyorsell === "buy"
        ? (totalprice += item.price * item.amount)
        : (totalprice -= item.price * item.amount)
    );

    info.forEach((item) =>
      item.buyorsell === "buy"
        ? (totalamount += Number(item.amount))
        : (totalamount -= Number(item.amount))
    );
    // console.log(totalprice,totalamount)
    return totalprice / totalamount;
  };
  const calReveneue = () => {
    //計算損益
    const result = ((Number(price) - calAvgCost()) / calAvgCost()) * 100;
    return result.toString().substring(0, 4);
  };
  // console.log("stockcard", show);
  // useEffect(() => {
  //   // calAvgCost();
  //   console.log(calAvgCost());
  // }, []);
  return (
    <>
      {show ? (
        <>
          <div
            className={[styles.stockcard, isAuth ? null : styles.blur].join(
              " "
            )}
          >
            <button
              type="button"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              className={styles.historybtn}
              onClick={() => openModal(name)}
            >
              <i className="far fa-clipboard"></i>
            </button>
            <div className={styles.stockcardTitle}>
              <p>{name}</p>
              <p></p>
            </div>
            <div className={styles.todaypricediv}>
              <ul className={styles.todayprice}>
                <li>
                  <p>最近一日收盤價</p>
                  <p>{price.toString().substring(0, 5)}</p>
                </li>
              </ul>
            </div>
            <div className={styles.costpricediv}>
              <ul className={styles.costprice}>
                <li>平均成本</li>
                <li className="mt-3">{calAvgCost()}</li>
              </ul>
            </div>
            <div className={styles.revenue}>
              <h5>損益</h5>
              <p className={calReveneue() > 0 ? "text-danger" : "text-success"}>
                {calReveneue()}%
              </p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Stockcard;
