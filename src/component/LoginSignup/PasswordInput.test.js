import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "fetch-mock";
import PasswordInput from "./PasswordInput";

test("type password will call the callback function", () => {
  const changePassword = jest.fn();

  render(<PasswordInput changePassword={changePassword} />);
  userEvent.type(screen.getByPlaceholderText(/test123/i), "any");
  expect(changePassword).toBeCalled();
  //   userEvent.type(screen.getByText)
});

test("click button to switch the password visibility", () => {
  const changePassword = jest.fn();
  const value = "any";
  render(<PasswordInput changePassword={changePassword} password={value} />);
  //   userEvent.type(screen.getByPlaceholderText(/test123/i), "any");

  screen.debug();
  userEvent.click(screen.getByRole("button"));
  expect(screen.getByDisplayValue(/any/)).toBeInTheDocument();

  //   userEvent.type(screen.getByText)
  screen.debug();
});
