import React, {
  useEffect,
  useState,
  useCallback,
  Suspense,
  useReducer,
} from "react";
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
import produce from "immer";

import Hito from "./component/Hito/Hito";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { apiGetStockprice, apiReadFirebase } from "./api/fromApi";
//context
import { ContextStore,ThemeContext } from "./Context/Context";
console.log(ThemeContext)
const stocklistInitialState = {
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
};

function stocklistReducer(state, action) {
  switch (action.type) {
    case "ADD_RECORD_FOR_NEW_STOCKNO": {
      const { no, date, price, amount, buyorsell } = action.payload;

      return {
        ...state,
        [no]: [
          { date: date, price: price, amount: amount, buyorsell: buyorsell },
        ],
      };
    }
    case "ADD_RECORD_FOR_EXIST_STOCKNO":
      const { no, date, price, amount, buyorsell } = action.payload;
      return {
        ...state,
        [no]: [
          ...state[no],
          { date: date, price: price, amount: amount, buyorsell: buyorsell },
        ],
      };
    case "EMPTY":
      return {};
    case "REPLACE":
      return action.payload;
    case "DELETE":
      const { [action.payload.no]: value, ...others } = state;
      // console.log("delete", others);

      return others;
    default:
      return state;
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [stocklist, dispatch] = useReducer(
    stocklistReducer,
    stocklistInitialState
  );
  const [stockprice, setStockprice] = useState({
    2330: [],
  }); //{2330 :  ["516.0000", "台積電"]}
  const [historyRecords, setHistoryRecords] = useState([]); //歷史紀錄for modal
  const [modalShow, setModalShow] = useState(false);
  // const [newStockNo, setNewStockNo] = useState([2330]);
  const [isAuth, setIsAuth] = useState(false); //登入狀態
  const [loginEmail, setLoginEmail] = useState(""); //存登入email
  const [darkTheme, setDarkTheme] = useState(false);// change theme

  const setModal = (stockNo) => {
    // console.log("setModal Fun", stockNo);
    setModalShow(true);
    setHistoryRecords(stocklist[stockNo]);
  };
  const closeModal = () => {
    setModalShow(false);
    setHistoryRecords([]);
  };
  const getStockPrice = useCallback(() => {
    //查詢股票價格

    // setIsLoading(true);
    //組成查詢股價的字串
    let str = "";
    Object.keys(stocklist).forEach((No) => (str += `tse_${No}.tw|`));

    apiGetStockprice(str)
      .then((res) => {
        let newState = {};
        res.data.msgArray.map((item) => (newState[item.c] = [item.y, item.n]));
        return newState;
        // setStockprice(newState);
      })
      .then((state) => {
        setStockprice(state);
      })
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err));
  }, [stocklist]);
  useEffect(() => {
    if (
      Object.keys(stocklist).length !== Object.keys(stockprice).length ||
      stockprice["2330"].length < 1
    ) {
      getStockPrice();
    }
  }, [stocklist, getStockPrice, stockprice]);

  const isAuthHandler = () => {
    setIsAuth(!isAuth);
  };
  const saveLoginEmail = (email) => {
    setLoginEmail(email);
  };
  const toEmptyStockList = () => {
    // setStocklist({});
    dispatch({ type: "EMPTY" });

    setIsLoading(false);
  };
  // const toSetNewStockNo = (value) => {
  //   setNewStockNo(value);
  // };

  const readFromFirebase = useCallback(() => {
    const token = localStorage.getItem("token");

    apiReadFirebase(token)
      .then((res) => {
        // console.log("read from firebase", res.data);
        if (!res.data) {
          // console.log("沒有資料");
          return;
        }
        // toOverWriteStockList(res.data);
        dispatch({ type: "REPLACE", payload: res.data });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  
  useEffect(() => {
    //登入就從firebase讀資料
    if (isAuth) {
      readFromFirebase();
    }
  }, [isAuth, readFromFirebase]);
  const LazyLoadChart = React.lazy(() => import("./component/Chart/Chart"));

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <ContextStore.Provider value={{ stocklist, dispatch }}>
        <div className={`App ${darkTheme?'AppDark':''}`}>
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
                    stockprice={stockprice}
                    historyRecords={historyRecords}
                    openModal={setModal}
                    modalShow={modalShow}
                    closeModal={closeModal}
                    isLoading={isLoading}
                    isAuth={isAuth}
                    loginEmail={loginEmail}
                  />
                </Route>
                <Route
                  path="/login"
                  render={(props) => (
                    <Login
                      {...props}
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
                      isAuth={isAuthHandler}
                      saveLoginEmail={saveLoginEmail}
                      toEmptyStockList={toEmptyStockList}
                    />
                  )}
                ></Route>
                <Route
                  path="/kplot/:stockNo"
                  render={(props) => <Kplot {...props} />}
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
                      stockprice={stockprice}
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
      </ContextStore.Provider>
    </ThemeContext.Provider>
  );
}
