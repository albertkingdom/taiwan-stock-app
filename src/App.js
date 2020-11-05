import React, { useEffect, useState, useRef, useCallback } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./component/Home";
import Navbar from "./component/Navbar/Navbar";
import Login from "./component/Login/Login";
import Logout from "./component/Logout/Logut";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
const usePreviousValue = (value) => {
  const ref = useRef();
  // useEffect(() => {
  //   ref.current = value;
  // });
  ref.current = value;
  // console.log(ref.current);
  return ref.current;
};
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  // console.log("isLOading", isLoading);
  const [stocklist, setStocklist] = useState({
    "2330": [
      {
        date: "2020-05-01",
        price: "300",
        amount: "1000",
        buyorsell: "buy"
      },
      {
        date: "2020-05-01",
        price: "350",
        amount: "1000",
        buyorsell: "buy"
      }
    ],
    "2880": [
      {
        date: "2020-04-10",
        price: "20",
        amount: "1000",
        buyorsell: "buy"
      }
    ]
  }); //完整的股票清單
  const [stockprice, setStockprice] = useState({
    2330: "",
    2880: ""
  });
  // const [stockprice, setStockprice] = useState({});
  const [historyRecords, setHistoryRecords] = useState([]); //歷史紀錄for modal
  const [modalShow, setModalShow] = useState(false);
  const [newStockNo, setNewStockNo] = useState("");
  const [isAuth, setIsAuth] = useState(false); //登入狀態
  const [loginEmail, setLoginEmail] = useState(""); //存登入email
  const toSetNewStockNoFunc = (No) => {
    setNewStockNo(No);
  };
  const setModal = (stockNo) => {
    // console.log("setModal Fun", stockNo);
    setModalShow(true);
    setHistoryRecords(stocklist[stockNo]);
  };
  const closeModal = () => {
    setModalShow(false);
    setHistoryRecords([]);
  };
  const prevStockList = usePreviousValue(stocklist);

  useEffect(() => {
    const getStockPrice = () => {
      //查詢股票價格

      setIsLoading(true);
      let str = "";
      for (var i in stocklist) {
        str += "tse_" + i + ".tw|";
      }

      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      fetch(
        proxyurl +
          "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=" +
          str +
          "&json=1&delay=0&_=" +
          Date.now()
      )
        .then((res) => res.json())
        // .then(data=>console.log(data))
        .then((data) => {
          // console.log("get price", data.msgArray);

          let newState = {};
          data.msgArray.map((item) => (newState[item.c] = item.y));

          setStockprice(newState);
        })
        .then(() => setIsLoading(false))

        .catch((err) => console.log(err));
    };

    if (stockprice["2330"] === "") {
      getStockPrice();
    }
    if (newStockNo === "") {
      return;
    }
    getStockPrice();
  }, [stocklist]);
  const addNewIndexFunc = useCallback(
    (newIndexNo, newIndexPrice, newIndexAmount, buyorsell, buydate) => {
      //新增一筆股票購買紀錄
      setIsLoading(true);
      setNewStockNo(newIndexNo); //設定新加入股票代碼
      let stockNo = newIndexNo;
      // console.log(stockNo);
      // console.log("stocklist[stockNo]", stocklist[stockNo]);

      let newStockArray;
      if (!stocklist[stockNo]) {
        // console.log("原本沒有這項目");
        newStockArray = [
          {
            date: buydate,
            price: newIndexPrice,
            amount: newIndexAmount,
            buyorsell: buyorsell
          }
        ];

        setStocklist((prevState) => ({
          ...prevState,
          [stockNo]: newStockArray
        }));
        // setNewStockNo(""); //設定新加入股票代碼
      } else {
        // console.log("原本有這項目");

        newStockArray = stocklist[stockNo].slice();
        newStockArray.push({
          date: buydate,
          price: newIndexPrice,
          amount: newIndexAmount,
          buyorsell: buyorsell
        });
        // console.log("newstockarr", newStockArray);
        setStocklist((prevState) => ({
          ...prevState,
          [stockNo]: newStockArray
        }));
      }

      // console.log("stockprice", stockprice);
    },
    [stocklist]
  );
  const toSetStockListFunc = (list) => {
    setIsLoading(true);
    const newNo = Object.keys(list).filter((No) => No !== "2330");
    // console.log("新增代號", newNo[newNo.length - 1]);
    setNewStockNo(newNo[newNo.length - 1]); //將新增
    setStocklist(list);
  };
  const saveAuthInfo = () => {}; //將登入拿到的token存在state
  const isAuthHandler = () => {
    setIsAuth(!isAuth);
    // window.alert("成功登入");
  };
  const saveLoginEmail = (email) => {
    setLoginEmail(email);
  };
  return (
    <div className="App">
      <Router>
        <Navbar isAuth={isAuth} />

        <Switch>
          <Route path="/" exact>
            <Home
              stocklist={stocklist}
              stockprice={stockprice}
              historyRecords={historyRecords}
              openModal={setModal}
              modalShow={modalShow}
              closeModal={closeModal}
              addNewIndexFunc={addNewIndexFunc}
              toSetStockListFunc={toSetStockListFunc}
              isLoading={isLoading}
              toSetNewStockNoFunc={toSetNewStockNoFunc}
              isAuth={isAuth}
              loginEmail={loginEmail}
            />
          </Route>
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                auth={saveAuthInfo}
                isAuth={isAuthHandler}
                saveLoginEmail={saveLoginEmail}
              />
            )}
          />
          <Route
            path="/logout"
            render={(props) => (
              <Logout
                {...props}
                auth={saveAuthInfo}
                isAuth={isAuthHandler}
                saveLoginEmail={saveLoginEmail}
              />
            )}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}
