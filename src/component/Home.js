import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Stockcard from "./stockcard";

import AddNewStock from "./addNewRecord";
import Chart from "./Chart";
import Loading from "./Loading";
import "./Home.css";
import styled from "styled-components";
import Historybox from "./Historybox";
import SaveRecord from "./SaveRecord/SaveRecord";
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
  // useEffect(() => {}, []);
  // console.log("Home", historyRecords, openModal);
  const [filterStockCard, setFilterStockCard] = useState("");
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
    ).then((res) => res.json());
    // .then((data) => console.log("firebase ", data));
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
  useEffect(() => {
    if (isAuth) {
      readFromFirebase();
    }
  }, [isAuth]);
  return (
    <div className="container text-center position-relative home">
      <h1>台股持股損益表</h1>
      <p>
        <i>不計入手續費、股市交易稅</i>
      </p>
      <Chart
        stocklist={stocklist}
        stockprice={stockprice}
        isLoading={isLoading}
      />
      <div className="row justify-content-center m-3">
        <div className="filterStock input-group col-5">
          <input
            className="form-control filterStock"
            type="text"
            placeholder="從庫存篩選股票代號"
            onChange={(e) => setFilterStockCard(e.target.value)}
            value={filterStockCard}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <SaveRecord
        saveToFirebase={saveToFirebase}
        readFromFirebase={readFromFirebase}
        saveToLocalStorage={saveToLocalStorage}
        readFromLocalStorage={readFromLocalStorage}
        isAuth={isAuth}
      />
      <AddNewStock stocklist={stocklist} addNewIndexFunc={addNewIndexFunc} />
      <div className="position-relative">
        {isLoading ? (
          // <h5>Loading</h5>
          <Loading />
        ) : (
          Object.keys(stocklist).map((item) => (
            <Stockcard
              key={item}
              name={item}
              info={stocklist[item]}
              price={stockprice[item]}
              show={
                filterStockCard.length === 0 ||
                item.indexOf(filterStockCard) > -1
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