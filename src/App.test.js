import React from "react";
import { screen, render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("render App component", () => {
    render(<App />);

    // screen.debug();
  });
});
