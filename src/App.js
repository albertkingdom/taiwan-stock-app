import React, { useEffect, useState, useCallback, Suspense } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./component/Home";
import Navbar from "./component/Navbar/Navbar";
import Login from "./component/LoginSignup/Login";
import Signup from "./component/LoginSignup/Signup";
import Logout from "./component/Logout/Logout";
import Kplot from "./component/kplot/Kplot";
import Historybox from "./component/Historybox/Historybox";
import StockIndex from "./component/StockIndex/StockIndex";
import Loading from "./component/Loading";
import AddRecord from "./component/Edit/AddRecord";

import Hito from "./component/Hito/Hito";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { apiGetStockprice } from "./api/fromApi";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [stocklist, setStocklist] = useState({
    2330: [
      {
        date: "2020-05-01",
        price: "300",
        amount: "1000",
        buyorsell: "buy",
      },
      {
        date: "2020-05-01",
        price: "350",
        amount: "1000",
        buyorsell: "buy",
      },
    ],
  }); //完整的股票清單
  const [stockprice, setStockprice] = useState({
    2330: [],
  }); //{2330 :  ["516.0000", "台積電"]}
  const [historyRecords, setHistoryRecords] = useState([]); //歷史紀錄for modal
  const [modalShow, setModalShow] = useState(false);
  const [newStockNo, setNewStockNo] = useState([2330]);
  const [isAuth, setIsAuth] = useState(false); //登入狀態
  const [loginEmail, setLoginEmail] = useState(""); //存登入email

  const setModal = (stockNo) => {
    // console.log("setModal Fun", stockNo);
    setModalShow(true);
    setHistoryRecords(stocklist[stockNo]);
  };
  const closeModal = () => {
    setModalShow(false);
    setHistoryRecords([]);
  };

  useEffect(() => {
    const getStockPrice = () => {
      //查詢股票價格

      // setIsLoading(true);
      //組成查詢股價的字串
      let str = "";
      Object.keys(stocklist).forEach((No) => (str += `tse_${No}.tw|`));

      apiGetStockprice(str)
        .then((res) => {
          let newState = {};
          res.data.msgArray.map(
            (item) => (newState[item.c] = [item.y, item.n])
          );
          return newState;
          // setStockprice(newState);
        })
        .then((state) => {
          setStockprice(state);
        })
        .then(() => setIsLoading(false))
        .catch((err) => console.log(err));
    };
    //沒有newstockNo就不需要查股價
    if (newStockNo.length > 0) {
      getStockPrice();
    }
  }, [newStockNo, stocklist]);

  const toOverWriteStockList = useCallback((list) => {
    //從資料庫讀取覆蓋stocklist
    // setIsLoading(true);

    setStocklist(list);

    setNewStockNo(Object.keys(list)); //觸發抓新增股票代號的股價
  }, []);

  const isAuthHandler = () => {
    setIsAuth(!isAuth);
  };
  const saveLoginEmail = (email) => {
    setLoginEmail(email);
  };
  const toEmptyStockList = () => {
    setStocklist({});
    setNewStockNo([]);
    setIsLoading(false);
  };
  const toSetNewStockNo = (value) => {
    setNewStockNo(value);
  };
  const toSetStocklist = (value) => {
    setStocklist(value);
  };
  const LazyLoadChart = React.lazy(() => import("./component/Chart/Chart"));

  return (
    <div className="App">
      <Router>
        <Navbar isAuth={isAuth} />

        <div className="up">
          <div className="row justify-content-around align-items-center">
            <div className="col-12 col-md-4">
              <StockIndex />
            </div>

            <div className="col-12 col-md-8">
              <Suspense fallback={<Loading />}>
                <LazyLoadChart
                  stocklist={stocklist}
                  stockprice={stockprice}
                  isLoading={isLoading}
                  isAuth={isAuth}
                />
              </Suspense>
            </div>
          </div>
        </div>
        <main className="main">
          <Switch>
            <Route path="/" exact>
              <Home
                stocklist={stocklist}
                stockprice={stockprice}
                historyRecords={historyRecords}
                openModal={setModal}
                modalShow={modalShow}
                closeModal={closeModal}
                toOverWriteStockList={toOverWriteStockList}
                isLoading={isLoading}
                isAuth={isAuth}
                loginEmail={loginEmail}
                toSetNewStockNo={toSetNewStockNo}
                toSetStocklist={toSetStocklist}
              />
            </Route>
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  // auth={saveAuthInfo}
                  isAuth={isAuthHandler}
                  saveLoginEmail={saveLoginEmail}
                />
              )}
            />
            <Route
              path="/signup"
              render={(props) => (
                <Signup
                  {...props}
                  // auth={saveAuthInfo}
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
                  // auth={saveAuthInfo}
                  isAuth={isAuthHandler}
                  saveLoginEmail={saveLoginEmail}
                  toEmptyStockList={toEmptyStockList}
                />
              )}
            ></Route>
            <Route
              path="/kplot/:stockNo"
              render={(props) => <Kplot {...props} stocklist={stocklist} />}
            ></Route>
            <Route
              path="/history/:stockNo"
              render={(props) => (
                <Historybox {...props} historyRecords={historyRecords} />
              )}
            ></Route>
            <Route
              path="/addrecord"
              render={(props) => (
                <AddRecord
                  {...props}
                  isAuth={isAuth}
                  historyRecords={historyRecords}
                  toSetNewStockNo={toSetNewStockNo}
                  toSetStocklist={toSetStocklist}
                  stockprice={stockprice}
                  stocklist={stocklist}
                />
              )}
            ></Route>
            <Route
              path="/hito"
              render={(props) => <Hito {...props} isAuth={isAuth} />}
            ></Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}
