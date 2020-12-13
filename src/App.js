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
import DelRecord from "./component/Edit/DelRecord";
import Hito from "./component/Hito/Hito";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Swal from "sweetalert2";
import produce from "immer";
import {
  apiGetStockprice,
  apiReadFirebase,
  getStockIndex,
} from "./api/fromApi";

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
    // 2880: [
    //   {
    //     date: "2020-04-10",
    //     price: "20",
    //     amount: "1000",
    //     buyorsell: "buy",
    //   },
    // ],
  }); //完整的股票清單
  const [stockprice, setStockprice] = useState({
    2330: [],
    // 2880: "",
  });
  const [historyRecords, setHistoryRecords] = useState([]); //歷史紀錄for modal
  const [modalShow, setModalShow] = useState(false);
  const [newStockNo, setNewStockNo] = useState([2330]);
  const [isAuth, setIsAuth] = useState(false); //登入狀態
  const [loginEmail, setLoginEmail] = useState(""); //存登入email
  const [stockIndex, setStockIndex] = useState(); //[大盤index, diff]

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

      setIsLoading(true);
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

  const addNewIndexFunc = useCallback(
    (newIndexNo, newIndexPrice, newIndexAmount, buyorsell, buydate) => {
      if (!isAuth) {
        //check if not auth, then exit
        Swal.fire({
          title: "請登入!",
          icon: "info",
          confirmButtonText: "ok",
        });
        return;
      }
      //新增一筆股票購買紀錄
      setIsLoading(true);
      if (!stockprice.hasOwnProperty(newIndexNo)) {
        setNewStockNo([newIndexNo]); //設定新加入股票代碼
      }

      if (!stocklist[newIndexNo]) {
        // console.log("原本沒有這項目");

        setStocklist(
          produce((draft) => {
            draft[newIndexNo] = [
              {
                date: buydate,
                price: newIndexPrice,
                amount: newIndexAmount,
                buyorsell: buyorsell,
              },
            ];
          })
        );
      } else {
        // console.log("原本有這項目");

        setStocklist(
          produce((draft) => {
            draft[newIndexNo].push({
              date: buydate,
              price: newIndexPrice,
              amount: newIndexAmount,
              buyorsell: buyorsell,
            });
          })
        );
      }
    },
    [stocklist, isAuth, stockprice]
  );
  const toOverWriteStockList = (list) => {
    //從資料庫讀取覆蓋stocklist
    setIsLoading(true);

    setStocklist(list);

    setNewStockNo(Object.keys(list)); //觸發抓新增股票代號的股價
  };
  const toDeleteRecord = (No) => {
    //刪除某隻股票的所有紀錄
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
        setNewStockNo("");
        setStocklist(
          produce((draft) => {
            delete draft[No];
          })
        );
      }
    });
  };
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

  const readFromFirebase = useCallback(() => {
    const token = localStorage.getItem("token");

    apiReadFirebase(token)
      .then((res) => {
        // console.log("read from firebase", res.data);
        if (!res.data) {
          // console.log("沒有資料");
          return;
        }
        toOverWriteStockList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    //登入就從firebase讀資料
    if (isAuth) {
      readFromFirebase();
    }
  }, [isAuth, readFromFirebase]);
  const LazyLoadChart = React.lazy(() => import("./component/Chart/Chart"));

  return (
    <div className="App">
      <Router>
        <Navbar isAuth={isAuth} />

        <div className="up">
          <div className="row justify-content-around align-items-center">
            <div className="col-12 col-md-4">
              <StockIndex stockIndex={stockIndex} />
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
                addNewIndexFunc={addNewIndexFunc}
                toOverWriteStockList={toOverWriteStockList}
                isLoading={isLoading}
                isAuth={isAuth}
                loginEmail={loginEmail}
                stockIndex={stockIndex}
                readFromFirebase={readFromFirebase}
                toDeleteRecord={toDeleteRecord}
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
              render={(props) => (
                <Kplot
                  {...props}
                  isAuth={isAuthHandler}
                  stocklist={stocklist}
                />
              )}
            ></Route>
            <Route
              path="/history/:stockNo"
              render={(props) => (
                <Historybox
                  {...props}
                  isAuth={isAuthHandler}
                  historyRecords={historyRecords}
                />
              )}
            ></Route>
            <Route
              path="/addrecord"
              render={(props) => (
                <AddRecord
                  {...props}
                  isAuth={isAuthHandler}
                  historyRecords={historyRecords}
                  addNewIndexFunc={addNewIndexFunc}
                />
              )}
            ></Route>
            <Route
              path="/hito"
              render={(props) => <Hito {...props} isAuth={isAuth} />}
            ></Route>
            {/* <Route
              path="/delrecord"
              render={(props) => (
                <DelRecord
                  {...props}
                  isAuth={isAuthHandler}
                  stockprice={stockprice}
                  toDeleteRecord={toDeleteRecord}
                />
              )}
            ></Route> */}
          </Switch>
        </main>
      </Router>
    </div>
  );
}
