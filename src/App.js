import React, { useEffect, useState, useCallback } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./component/Home";
import Navbar from "./component/Navbar/Navbar";
import Login from "./component/LoginSignup/Login";
import Signup from "./component/LoginSignup/Signup";
import Logout from "./component/Logout/Logut";
import Kplot from "./component/kplot/Kplot";
import Historybox from "./component/Historybox/Historybox";

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
    2880: [
      {
        date: "2020-04-10",
        price: "20",
        amount: "1000",
        buyorsell: "buy",
      },
    ],
  }); //完整的股票清單
  const [stockprice, setStockprice] = useState({
    2330: "",
    2880: "",
  });
  const [historyRecords, setHistoryRecords] = useState([]); //歷史紀錄for modal
  const [modalShow, setModalShow] = useState(false);
  const [newStockNo, setNewStockNo] = useState("");
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
          // console.log(res);
          let newState = {};
          res.data.msgArray.map((item) => (newState[item.c] = item.y));

          setStockprice(newState);
        })
        .then(() => setIsLoading(false))
        .catch((err) => console.log(err));
    };
    //沒有newstockNo就不需要查股價
    if (newStockNo) {
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
      setNewStockNo(newIndexNo); //設定新加入股票代碼

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
    [stocklist, isAuth]
  );
  const toOverWriteStockList = (list) => {
    //從資料庫讀取覆蓋stocklist
    setIsLoading(true);

    setNewStockNo(Object.keys(list)); //觸發抓新增股票代號的股價
    setStocklist(list);
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
        // console.log(res.data);
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
              />
            )}
          ></Route>
          <Route
            path="/kplot/:stockNo"
            render={(props) => (
              <Kplot {...props} isAuth={isAuthHandler} stocklist={stocklist} />
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
        </Switch>
      </Router>
    </div>
  );
}
