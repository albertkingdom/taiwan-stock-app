import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "fetch-mock";
import SaveRecord from "./SaveRecord";

test("the savetofirebase is called when the button clicked", () => {
  const saveToFirebase = jest.fn();
  render(<SaveRecord saveToFirebase={saveToFirebase} isAuth="true" />);
  //   screen.debug();

  userEvent.click(screen.getByText(/save/i));
  expect(saveToFirebase).toBeCalled();
});
