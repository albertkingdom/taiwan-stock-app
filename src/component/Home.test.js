import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "fetch-mock";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";
const stocklist = {
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
const stockprice = { 2330: "500" };
test("render Home", () => {
  //to test a component that inside a Route, dont forget to import in the test file
  render(
    <Router>
      <Home stocklist={stocklist} stockprice={stockprice} />
    </Router>
  );
  //   screen.debug();
});

test('if already login,  "Please login !" reminder is disappear', () => {
  render(
    <Router>
      <Home stocklist={stocklist} stockprice={stockprice} isAuth="true" />
    </Router>
  );
  //登入提示消失
  expect(screen.queryByText(/please\slogin/i)).toBeNull();
});
