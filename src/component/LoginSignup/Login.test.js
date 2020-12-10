import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "fetch-mock";

import Login from "./Login";

test("login method", () => {
  //   const signinHandler = jest.fn();
  render(<Login />);
  userEvent.click(screen.getByText(/sign\sin/i));
  //   screen.debug();
  //可以找到email password
  expect(screen.getByText(/Password/)).toBeInTheDocument();
  expect(screen.getByText(/Email/)).toBeInTheDocument();

  //input password and id
  userEvent.type(screen.getByLabelText(/email/i), "test@gmail.com");
  userEvent.type(screen.getByLabelText(/password/i), "test123456");
  //id you typed is displayed on screen
  expect(screen.getByDisplayValue(/gmail.com/i)).toBeInTheDocument();
});
