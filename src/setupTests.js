//for every .test.js file
import React from "react";
import "@testing-library/jest-dom";
import "jest-canvas-mock";

//fix chart js test error: Failed to create chart: can't acquire context from the given item
//https://github.com/reactchartjs/react-chartjs-2/issues/155

jest.mock("react-chartjs-2", () => ({
  Bar: () => null, // add any additional chart types here
  Line: () => null,
  Doughnut: () => null,
}));
