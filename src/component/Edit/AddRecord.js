import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import produce from "immer";
import { Form, Button } from "react-bootstrap";
import Autosuggest from "react-autosuggest";
import { editlist as stockNoAndNameList } from "../asset/stocklist";
import "./Autosuggest.css";
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value) => {
  const inputValue = value.toString().trim();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : stockNoAndNameList.filter(
        (stock) =>
          stock.no.toString().slice(0, inputLength) === inputValue ||
          stock.name.includes(inputValue)
      );
};
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion.no;
// Use your imagination to render suggestions.
const renderSuggestion = (suggestion) => (
  <span>
    {suggestion.no} {suggestion.name}
  </span>
);

const StyledButton = styled.button`
  /* top: */
  width: 200px;
  background-color: #e5f4f3;
  border: 0px;
  padding: 5px 10px;
  margin: 20px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
`;
export default function AddRecord({
  history,
  toSetNewStockNo,
  toSetStocklist,
  isAuth,
  stockprice,
  stocklist,
}) {
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

  //------------Auto suggestion related--------------------------------
  // const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onAutoSuggestChange = (e, { newValue }) => {
    // setValue(newValue);
    setNewRecord({ ...newRecord, stockNo: newValue.toString() });
  };
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: "e.g. 2330",
    value: newRecord.stockNo,
    onChange: onAutoSuggestChange,
    name: "stockNo",
    className: "form-control",
  };

  return (
    <div className="container-md">
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>股票代號</Form.Label>
          {/* <Form.Control
            type="text"
            placeholder="e.g. 2330"
            name="stockNo"
            value={newRecord.stockNo}
            onChange={handleInput}
          /> */}
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </Form.Group>
        <Form.Group controlId="">
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

        <StyledButton
          variant="primary"
          type="submit"
          className="submitButton text-center"
        >
          新增
        </StyledButton>
      </Form>
    </div>
  );
}
