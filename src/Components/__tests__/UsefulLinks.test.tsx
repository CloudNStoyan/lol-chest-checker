import React from "react";
import UsefulLinks from "../UsefulLinks";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { singleChampData } from "./dataset";

test("useful links renders properly", () => {
  const { getByText } = render(<UsefulLinks currentPick={singleChampData} />);

  const opgg = getByText("OP.GG");
  expect(opgg).toBeTruthy();
});
