import React from "react";
import { screen, render } from "@testing-library/react";
import Chart from "./Chart";

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
  2880: [
    {
      date: "2020-04-10",
      price: "20",
      amount: "1000",
      buyorsell: "buy",
    },
  ],
};
const stockprice = { 2330: "500", 2880: "30" };
test("render chart", () => {
  render(
    <Chart
      stocklist={stocklist}
      stockprice={stockprice}
      isLoading="false"
      isAuth="true"
    />
  );

  screen.debug();
  screen.getByText(/市值/);
  //still have error message
});
