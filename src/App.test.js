import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "fetch-mock";
import App from "./App";

describe("App", () => {
  test("render App component", () => {
    render(<App />);

    // screen.debug();
  });

  test("click login button", async () => {
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

    render(<App />);
    //模擬按下login按鈕
    userEvent.click(screen.getByText(/Login/));
    // screen.getByRole("textbox");
    // screen.debug();
    //可以找到email password
    expect(screen.getByText(/Password/)).toBeInTheDocument();
    expect(screen.getByText(/Email/)).toBeInTheDocument();
  });
});
