import React, { useState, useCallback } from "react";
import Swal from "sweetalert2";
import produce from "immer";

const AddNewRecord = ({
  stocklist,
  stockprice,
  isAuth,
  toSetNewStockNo,
  toSetStocklist,
}) => {
  const [newIndexNo, setNewIndexNo] = useState("");
  const [newIndexPrice, setNewIndexPrice] = useState("");
  const [newIndexAmount, setNewIndexAmount] = useState("");
  const [buydate, setBuydate] = useState("");
  const [buyorsell, setBuyorsell] = useState("");

  const datepickfunc = (date) => {
    // console.log(date);
    setBuydate(date);
  };
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
      // setIsLoading(true);
      if (!stockprice.hasOwnProperty(newIndexNo)) {
        toSetNewStockNo([newIndexNo]); //設定新加入股票代碼
      }

      if (!stocklist[newIndexNo]) {
        // console.log("原本沒有這項目");

        toSetStocklist(
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

        toSetStocklist(
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
    [stocklist, isAuth, stockprice, toSetNewStockNo, toSetStocklist]
  );
  return (
    <div className="input-group addNewStock">
      <input
        type="text"
        className="form-control"
        placeholder="新增一筆股票代號"
        // style={{ width: "100px" }}
        value={newIndexNo}
        onChange={(e) => setNewIndexNo(e.target.value)}
      />
      <select
        className="custom-select"
        onChange={(e) => setBuyorsell(e.target.value)}
        value={buyorsell}
      >
        <option value="" defaultValue>
          買/賣
        </option>
        <option value="buy">買</option>
        <option value="sell">賣</option>
      </select>
      <input
        type="text"
        className="form-control"
        placeholder="價格"
        // style={{ width: "100px" }}
        value={newIndexPrice.toLocaleString()}
        onChange={(e) => setNewIndexPrice(e.target.value)}
      />

      <input
        type="text"
        className="form-control"
        placeholder="股數"
        // style={{ width: "100px" }}
        value={newIndexAmount}
        onChange={(e) => setNewIndexAmount(e.target.value)}
      />
      <input
        type="date"
        className="form-control"
        value={buydate}
        onChange={(e) => datepickfunc(e.target.value)}
        max={new Date().toLocaleDateString().replace(/\//g, "-")}
      />
      <div id="datepickerdiv">
        <button
          className="btn btn-outline-info"
          id="addRecordBtn"
          title="新增一筆交易紀錄"
          onClick={() => {
            addNewIndexFunc(
              newIndexNo,
              newIndexPrice,
              newIndexAmount,
              buyorsell,
              buydate
            );
            setNewIndexNo("");
            setBuydate("");
            setNewIndexPrice("");
            setNewIndexAmount("");
            setBuyorsell("");
          }}
        >
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default AddNewRecord;
