import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./stockcard.module.css";
const Stockcard = ({ name, info, price, show, openModal, isAuth }) => {
  // console.log("stockcard", stocklist);
  // const name = stocklist.keys
  // console.log("stockcard name", name);
  // console.log("stockcard info", info);
  // console.log("stockcard price", price);

  // console.log("stockcard openModal", openModal);
  const [amount, setAmount] = useState(0);
  const [avgCost, setAvgCost] = useState(0);
  const [revenue, setRevenue] = useState(0);

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
    const result = ((Number(price) - avgCost) / avgCost) * 100;
    return result.toString().substring(0, 5);
  };

  const calAmount = () => {
    let totalamount = 0;
    info.forEach((item) =>
      item.buyorsell === "buy"
        ? (totalamount += Number(item.amount))
        : (totalamount -= Number(item.amount))
    );
    return totalamount;
  };

  useEffect(() => {
    setAvgCost(calAvgCost());
    setRevenue(calReveneue());
    setAmount(calAmount());
  }, [avgCost]);
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
              <Link to={`/kplot/${name}`}>看k線圖</Link>
            </div>
            <div className={styles.todaypricediv}>
              <ul className={styles.todayprice}>
                <li>最近一日收盤價</li>
                <li className="mt-3">
                  <p>{price.toString().substring(0, 5)}</p>
                </li>
              </ul>
            </div>
            <div className={styles.costpricediv}>
              <ul className={styles.costprice}>
                <li>持有股數</li>
                <li className="mt-3">{amount.toLocaleString()}</li>
              </ul>
            </div>
            <div className={styles.costpricediv}>
              <ul className={styles.costprice}>
                <li>平均成本</li>
                <li className="mt-3">{avgCost}</li>
              </ul>
            </div>
            <div className={styles.revenue}>
              <ul>
                <li>損益</li>
                <li className="mt-3">
                  <p className={revenue > 0 ? "text-danger" : "text-success"}>
                    {revenue}%
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Stockcard;
