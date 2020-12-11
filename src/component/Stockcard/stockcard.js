import React, { useEffect, useState, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./stockcard.module.css";
const Stockcard = ({
  name,
  info,
  price,
  show,
  openModal,
  isAuth,
  toDeleteRecord,
  history,
  chinesename,
  showDeleteButton,
}) => {
  const [amount, setAmount] = useState(0);
  const [avgCost, setAvgCost] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const calAvgCost = useCallback(() => {
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
  }, [info]);
  const calReveneue = useCallback(() => {
    //計算損益
    const result = ((Number(price) - avgCost) / avgCost) * 100;
    return result.toString().substring(0, 5);
  }, [avgCost, price]);

  const calAmount = useCallback(() => {
    let totalamount = 0;
    info.forEach((item) =>
      item.buyorsell === "buy"
        ? (totalamount += Number(item.amount))
        : (totalamount -= Number(item.amount))
    );
    return totalamount;
  }, [info]);

  useEffect(() => {
    if (!info) {
      return;
    }
    setAvgCost(calAvgCost());
    setRevenue(calReveneue());
    setAmount(calAmount());
  }, [avgCost, calAmount, calAvgCost, calReveneue, info]);

  if (!info) {
    return null;
  }
  return (
    <>
      {show ? (
        <>
          <ul className={[styles.stockcard].join(" ")}>
            <li className={showDeleteButton ? styles.todelete : styles.hide}>
              <button
                onClick={() => toDeleteRecord(name)}
                className={styles.historybtn}
              >
                <i className="fas fa-minus-circle"></i>
              </button>
            </li>
            <li>
              <button
                type="button"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                className={styles.historybtn}
                onClick={() => {
                  openModal(name);
                  history.push(`/history/${name}`);
                }}
              >
                <i className="far fa-clipboard"></i>
              </button>
            </li>

            <li>
              <p>{chinesename}</p>
              <p>{name}</p>
              <Link to={`/kplot/${name}`}>看k線圖</Link>
            </li>
            <li>{price && price.toString().substring(0, 5)}</li>
            <li>{amount.toLocaleString()}</li>
            <li>{avgCost.toString().substring(0, 5)}</li>
            <li>
              <p className={revenue > 0 ? "text-danger" : "text-success"}>
                {revenue}%
              </p>
            </li>
          </ul>
        </>
      ) : null}
    </>
  );
};

export default React.memo(withRouter(Stockcard));
