import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Stockcard from "./Stockcard/stockcard";

import AddNewStock from "./addNewRecord";
import Chart from "./Chart";
import Loading from "./Loading";
import "./Home.css";
import styled from "styled-components";
import Historybox from "./Historybox/Historybox";
import SaveRecord from "./SaveRecord/SaveRecord";
import Filter from "./Filter/Filter";
import Kplot from "./kplot/Kplot";
import TitleBar from "./TitleBar/TitleBar";
import Swal from "sweetalert2";

// styled component
const RemindLoginHint = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  /* height: 50px; */
  height: 100%;
  width: 100%;
  z-index: 200;

  p {
    font-size: 28px;
    height: 100%;
    line-height: 200px;
    /* background-color: none; */
    margin-bottom: 0px;
  }
`;
const Home = ({
  stocklist,
  stockprice,
  historyRecords,
  openModal,
  modalShow,
  closeModal,
  addNewIndexFunc,
  toSetStockListFunc,
  isLoading,
  toSetNewStockNoFunc,
  isAuth,
  loginEmail,
}) => {
  const [filterStockNo, setFilterStockNo] = useState("");
  const [stocklistDisplay, setStocklistDisplay] = useState([]);
  const [sortMethod, setSortMethod] = useState("");
  const saveToLocalStorage = () => {
    //按鍵功能：存入localstorage
    localStorage.setItem("stocklist", JSON.stringify(stocklist));
  };
  const readFromLocalStorage = () => {
    //按鍵功能：讀取localstorage
    if (localStorage.getItem("stocklist").length > 0) {
      let agree = window.confirm("this will overwrite current stock list?");
      if (agree) {
        let newstocklist = JSON.parse(localStorage.getItem("stocklist"));
        // console.log(this.stockObj);
        toSetStockListFunc(newstocklist);
      }
    }
  };
  function getAccount() {
    //取出登入email的帳號部分
    const copyEmail = loginEmail.slice();
    return copyEmail.split("@")[0];
  }
  const saveToFirebase = () => {
    const token = localStorage.getItem("token");
    // console.log("token", token);
    //?auth=token, token是登入後取得的

    fetch(
      "https://udemy-react-burgerbuilde-eda07.firebaseio.com/stocklist/" +
        getAccount() +
        ".json?auth=" +
        token,
      {
        body: JSON.stringify(stocklist),
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) =>
        Swal.fire({
          title: "儲存成功!",
          icon: "success",
          confirmButtonText: "ok",
        })
      )
      .catch((error) => console.log(error));
  };
  const readFromFirebase = () => {
    const token = localStorage.getItem("token");
    // console.log("token", token);
    fetch(
      "https://udemy-react-burgerbuilde-eda07.firebaseio.com/stocklist/" +
        getAccount() +
        ".json?auth=" +
        token
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("firebase ", data);
        // let agree = window.confirm("即將從資料庫讀取資料並覆寫?");

        // if (agree) {
        //   toSetStockListFunc(data);
        // }
        toSetStockListFunc(data);
      })
      .catch((err) => console.log(err));
  };
  const toFilter = (stockNo) => {
    setFilterStockNo(stockNo);
  };
  const sort = () => {
    let newOrderedArray;
    switch (sortMethod) {
      case "stockNoAsc":
        newOrderedArray = Object.keys(stocklist).sort((a, b) => a - b);
        break;
      case "stockNoDesc":
        newOrderedArray = Object.keys(stocklist).sort((a, b) => b - a);
        break;
      case "stockPriceAsc":
        newOrderedArray = Object.keys(stockprice).sort(
          (a, b) => stockprice[a] - stockprice[b]
        );
        break;
      case "stockPriceDesc":
        newOrderedArray = Object.keys(stockprice).sort(
          (a, b) => stockprice[b] - stockprice[a]
        );
        break;
      default:
        newOrderedArray = Object.keys(stocklist);
    }

    // console.log(newOrderedArray);

    setStocklistDisplay(newOrderedArray);
  };
  const toSetSortMethod = (method) => {
    setSortMethod(method);
  };
  useEffect(() => {
    //登入就從firebase讀資料
    if (isAuth) {
      readFromFirebase();
    }
  }, [isAuth]);
  useEffect(() => {
    if (!sortMethod) {
      setStocklistDisplay(Object.keys(stocklist));
    } else {
      sort();
    }
  }, [sortMethod, stocklist]);
  return (
    <div className="container text-center home">
      <div className="dashboard">
        <h1>台股持股損益表</h1>
        <p>
          <i>不計入手續費、股市交易稅</i>
        </p>
        <Chart
          stocklist={stocklist}
          stockprice={stockprice}
          isLoading={isLoading}
        />
        <Filter filterStockNo={filterStockNo} toFilter={toFilter} />
        <SaveRecord
          saveToFirebase={saveToFirebase}
          readFromFirebase={readFromFirebase}
          saveToLocalStorage={saveToLocalStorage}
          readFromLocalStorage={readFromLocalStorage}
          isAuth={isAuth}
        />
        <AddNewStock stocklist={stocklist} addNewIndexFunc={addNewIndexFunc} />
      </div>
      <div className="position-relative stock-list">
        <TitleBar sortMethod={sortMethod} toSetSortMethod={toSetSortMethod} />
        {isLoading ? (
          // <h5>Loading</h5>
          <Loading />
        ) : (
          stocklistDisplay.map((item) => (
            <Stockcard
              key={item}
              name={item}
              info={stocklist[item]}
              price={stockprice[item]}
              show={
                filterStockNo.length === 0 || item.indexOf(filterStockNo) > -1
              }
              openModal={openModal}
              isAuth={isAuth}
            />
          ))
        )}

        {isAuth ? null : (
          <RemindLoginHint>
            <p>Please login!</p>
          </RemindLoginHint>
        )}
      </div>
      <Historybox
        show={modalShow}
        historyRecords={historyRecords}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Home;
