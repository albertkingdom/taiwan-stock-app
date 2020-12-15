import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";

import Stockcard from "./Stockcard/stockcard";

import Loading from "./Loading";
import "./Home.css";
import styled from "styled-components";

import SaveRecord from "./SaveRecord/SaveRecord";
import Filter from "./Filter/Filter";
import TitleBar from "./TitleBar/TitleBar";
import Edit from "./Edit/Edit";
import Swal from "sweetalert2";
// import StockIndex from "./StockIndex/StockIndex";
import { apiSaveToFirebase } from "../api/fromApi";
import nothingherejpg from "./asset/theres-nothing-here.jpg";
//context api
import { ContextStore } from "../Context/Context";

// styled component
const RemindLoginHint = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  width: 100%;
  z-index: 200;

  p {
    font-size: 24px;
    /* height: 100%; */
    /* line-height: 200px; */
    /* background-color: none; */
    margin: 10px auto;
  }
`;
const Home = ({
  // stocklist,
  stockprice,
  openModal,
  isLoading,
  isAuth,
  readFromFirebase,
  toDeleteRecord,
  // toOverWriteStockList,
  // toSetNewStockNo,
  // toSetStocklist,
}) => {
  const { stocklist } = useContext(ContextStore); //context api
  const [filterStockNo, setFilterStockNo] = useState("");
  const [stocklistDisplay, setStocklistDisplay] = useState([]); //[2330,2880...]
  const [sortMethod, setSortMethod] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(false);

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

  return (
    <div className="container-md text-center home">
      <div className="function" ref={upRef}>
        <Filter filterStockNo={filterStockNo} toFilter={toFilter} />
        <SaveRecord
          saveToFirebase={saveToFirebase}
          readFromFirebase={readFromFirebase}
          // toOverWriteStockList={toOverWriteStockList}
          isAuth={isAuth}
        />
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
              price={stockprice[item] && stockprice[item][0]}
              chinesename={stockprice[item] && stockprice[item][1]}
              show={
                filterStockNo.length === 0 || item.indexOf(filterStockNo) > -1
              }
              openModal={openModal}
              isAuth={isAuth}
              toDeleteRecord={toDeleteRecord}
              showDeleteButton={showDeleteButton}
              // toSetNewStockNo={toSetNewStockNo}
            />
          ))
        )}

        <RemindLoginHint show={!Object.keys(stocklist).length}>
          <img src={nothingherejpg} alt="nothing here!" />
          <p>Please login and add your first record!</p>
        </RemindLoginHint>
        <Edit
          toShowDeleteButton={() => setShowDeleteButton(!showDeleteButton)}
          showDeleteButton={showDeleteButton}
        />
      </div>

      <div className="disclaimer">
        <i className="fas fa-info-circle"></i>
        <span className="tooltiptext">不計入手續費、股市交易稅</span>
      </div>
    </div>
  );
};

export default Home;
