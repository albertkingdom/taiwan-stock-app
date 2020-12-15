import React from "react";

export const stocklistInitialState = {
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
//global state context
export const ContextStore = React.createContext({
  stocklist: stocklistInitialState,
});
