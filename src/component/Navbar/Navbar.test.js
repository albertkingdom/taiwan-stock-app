import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";
test("render Navbar when desktop page width, not login", () => {
  render(
    <Router>
      <Navbar isAuth={false} />
    </Router>
  );
  //rwd, normal width both have login link
  expect(screen.getAllByText(/Login/)).toHaveLength(2);
  expect(screen.getAllByText(/Sign Up/)).toHaveLength(2);
  //when not login, there's not logout link
  expect(screen.queryByText(/Logout/)).toBeNull();
});
