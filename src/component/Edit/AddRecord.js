import React, { useState, useCallback, useContext } from "react";
import { StyledAddButton } from "../StyledComponents/StyledComponents";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import MyAutoSuggest from "../Autosuggest/MyAutosuggest";

//context api
import { ContextStore } from "../../Context/Context";

export default function AddRecord({ history, isAuth }) {
  const { stocklist, dispatch } = useContext(ContextStore); //context api
  const [newRecord, setNewRecord] = useState({
    stockNo: "",
    newIndexPrice: "",
    newIndexAmount: "",
    date: "",
    buyorsell: "",
  });
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
      // if (!stockprice.hasOwnProperty(newIndexNo)) {
      //   toSetNewStockNo([newIndexNo]); //設定新加入股票代碼
      // }

      if (!stocklist[newIndexNo]) {
        // console.log("原本沒有這項目");

        dispatch({
          type: "ADD_RECORD_FOR_NEW_STOCKNO",
          payload: {
            no: newIndexNo,
            date: buydate,
            price: newIndexPrice,
            amount: newIndexAmount,
            buyorsell: buyorsell,
          },
        });
      } else {
        // console.log("原本有這項目");

        dispatch({
          type: "ADD_RECORD_FOR_EXIST_STOCKNO",
          payload: {
            no: newIndexNo,
            date: buydate,
            price: newIndexPrice,
            amount: newIndexAmount,
            buyorsell: buyorsell,
          },
        });
      }
    },
    [stocklist, isAuth, dispatch]
  );
  const submitHandler = (e) => {
    e.preventDefault();
    addNewIndexFunc(
      newRecord.stockNo,
      newRecord.newIndexPrice,
      newRecord.newIndexAmount,
      newRecord.buyorsell,
      newRecord.date
    );
    setNewRecord({
      stockNo: "",
      newIndexPrice: "",
      newIndexAmount: "",
      date: "",
      buyorsell: "",
    });
    history.replace("/");
  };
  const handleInput = (e) => {
    // console.log(e.target.name);
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value.toString() });
  };

  return (
    <div className="container-md">
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>股票代號</Form.Label>
          <MyAutoSuggest
            placeholder="e.g.2330"
            onChange={(newValue) =>
              setNewRecord({ ...newRecord, stockNo: newValue.toString() })
            }
            name="stockNo"
            className="form-control"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>買/賣</Form.Label>
          <Form.Control
            as="select"
            name="buyorsell"
            onChange={handleInput}
            value={newRecord.buyorsell}
          >
            <option>買/賣</option>
            <option value="buy">買</option>
            <option value="sell">賣</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>買/賣股價</Form.Label>
          <Form.Control
            type="number"
            placeholder=""
            name="newIndexPrice"
            value={newRecord.newIndexPrice}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>股數</Form.Label>
          <Form.Control
            type="number"
            placeholder=""
            name="newIndexAmount"
            value={newRecord.newIndexAmount}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>交易日期</Form.Label>
          <Form.Control
            type="date"
            placeholder=""
            max={new Date().toLocaleDateString().replace(/\//g, "-")}
            name="date"
            value={newRecord.date}
            onChange={handleInput}
          />
        </Form.Group>

        <StyledAddButton
          variant="primary"
          type="submit"
          className="submitButton text-center"
        >
          新增
        </StyledAddButton>
      </Form>
    </div>
  );
}
