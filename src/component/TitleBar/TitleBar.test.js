import React from "react";
import { screen, render } from "@testing-library/react";
import TitleBar from "./TitleBar";

describe("App", () => {
  test("render TitleBar component", () => {
    render(<TitleBar sortMethod="stockNoAsc" />);

    //查看dom結構
    // screen.debug();

    //getByText, getByRole 檢查dom結構是否有某元素or字串
    screen.getByText("股價");

    // screen.getByRole(""); //自動建議元素名稱

    screen.getByRole("list");
  });
});
