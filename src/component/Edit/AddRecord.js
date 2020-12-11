import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

const Div = styled.div`
  /* top: */
`;
export default function AddRecord({ addNewIndexFunc }) {
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
  };
  const handleInput = (e) => {
    // console.log(e.target.name);
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
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
            type="text"
            placeholder=""
            name="newIndexPrice"
            value={newRecord.newIndexPrice}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>股數</Form.Label>
          <Form.Control
            type="text"
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
