import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

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
export default function AddRecord({ addNewIndexFunc, history }) {
  const [newRecord, setNewRecord] = useState({
    stockNo: "",
    newIndexPrice: "",
    newIndexAmount: "",
    date: "",
    buyorsell: "",
  });
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
        <Form.Group controlId="formBasicEmail">
          <Form.Label>股票代號</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. 2330"
            name="stockNo"
            value={newRecord.stockNo}
            onChange={handleInput}
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
        <Form.Group controlId="formBasicEmail">
          <Form.Label>買/賣股價</Form.Label>
          <Form.Control
            type="number"
            placeholder=""
            name="newIndexPrice"
            value={newRecord.newIndexPrice}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>股數</Form.Label>
          <Form.Control
            type="number"
            placeholder=""
            name="newIndexAmount"
            value={newRecord.newIndexAmount}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
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
