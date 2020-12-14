import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tooltip from "./Tooltip";

test("render Tooltip, the component includes a button", () => {
  render(<Tooltip showTooltip="true" />);
  //   screen.debug();

  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("click button in the tooltip will call a callback function", () => {
  const mockfn = jest.fn();
  render(<Tooltip showTooltip="true" handleAddFollowing={mockfn} />);

  userEvent.click(screen.getByRole("button"));
  expect(mockfn).toHaveBeenCalled();
});
