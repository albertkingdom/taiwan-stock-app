import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  Suspense,
} from "react";

import Stockcard from "./Stockcard/stockcard";
import AddNewStock from "./addNewRecord";
// import Chart from "./Chart/Chart";
import Loading from "./Loading";
import "./Home.css";
import styled from "styled-components";

import SaveRecord from "./SaveRecord/SaveRecord";
import Filter from "./Filter/Filter";
import TitleBar from "./TitleBar/TitleBar";
import Swal from "sweetalert2";
import StockIndex from "./StockIndex/StockIndex";
import { apiSaveToFirebase } from "../api/fromApi";
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
  openModal,
  addNewIndexFunc,
  isLoading,
  isAuth,
  stockIndex,
  readFromFirebase,
  toDeleteRecord,
}) => {
  const [filterStockNo, setFilterStockNo] = useState("");
  const [stocklistDisplay, setStocklistDisplay] = useState([]); //[2330,2880...]
  const [sortMethod, setSortMethod] = useState("");

  const saveToFirebase = useCallback(() => {
    const token = localStorage.getItem("token");
    // console.log("token", token);
    //?auth=token, token是登入後取得的

    apiSaveToFirebase(token, stocklist)
      .then((res) =>
        Swal.fire({
          title: "儲存成功!",
          icon: "success",
          confirmButtonText: "ok",
        })
      )
      .catch((error) => console.log(error));
  }, [stocklist]);

  const toFilter = (stockNo) => {
    setFilterStockNo(stockNo);
  };

  const toSetSortMethod = (method) => {
    setSortMethod(method);
  };

  const stocklistRef = useRef(null);
  const upRef = useRef(null);
  useEffect(() => {
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
    if (!sortMethod) {
      setStocklistDisplay(Object.keys(stocklist));
    } else {
      sort();
    }
  }, [sortMethod, stocklist, stockprice]);

  useEffect(() => {
    const stocklistH = stocklistRef.current.clientHeight;
    // console.log("stocklist height", stocklistH);
  }, []);

  const LazyLoadChart = React.lazy(() => import("./Chart/Chart"));
  return (
    <div className="container-md text-center home">
      <div className="up" ref={upRef}>
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
        <Filter filterStockNo={filterStockNo} toFilter={toFilter} />
        <SaveRecord
          saveToFirebase={saveToFirebase}
          readFromFirebase={readFromFirebase}
          // saveToLocalStorage={saveToLocalStorage}
          // readFromLocalStorage={readFromLocalStorage}
          isAuth={isAuth}
        />
        <AddNewStock stocklist={stocklist} addNewIndexFunc={addNewIndexFunc} />
      </div>

      <div className="position-relative stock-list" ref={stocklistRef}>
        <TitleBar sortMethod={sortMethod} toSetSortMethod={toSetSortMethod} />
        {isLoading ? (
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
              toDeleteRecord={toDeleteRecord}
            />
          ))
        )}

        {isAuth ? null : (
          <RemindLoginHint>
            <p>Please login!</p>
          </RemindLoginHint>
        )}
      </div>

      <div className="disclaimer">
        <i className="fas fa-info-circle"></i>
        <span className="tooltiptext">不計入手續費、股市交易稅</span>
      </div>
    </div>
  );
};

export default Home;
