import React, { useEffect, useState, useCallback, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import produce from "immer";
import styles from "./stockcard.module.css";
//context api
import { ContextStore, ThemeContext } from "../../Context/Context";
const Stockcard = ({
  name,
  // info,
  price,
  show,
  openModal,
  isAuth,
  // toDeleteRecord,
  history,
  chinesename,
  showDeleteButton,
  // toSetNewStockNo,
  // toSetStocklist,
}) => {
  const { stocklist, dispatch } = useContext(ContextStore); //context api
  const { darkTheme } = useContext(ThemeContext);
  const info = stocklist[name];

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
  const toDeleteRecord = (No) => {
    //刪除某隻股票的所有紀錄
    // console.log("stockcard", No);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
        // toSetNewStockNo([]);
        // toSetStocklist(
        //   produce((draft) => {
        //     delete draft[No];
        //   })
        // );
        dispatch({ type: "DELETE", payload: { no: No } });
      }
    });
  };
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
          <ul
            className={`${styles.stockcard} ${
              darkTheme ? styles.stockcardDark : ""
            }`}
          >
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
              <Link to={`/kplot/${name}`} className="text-decoration-none">
                看k線圖
              </Link>
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
