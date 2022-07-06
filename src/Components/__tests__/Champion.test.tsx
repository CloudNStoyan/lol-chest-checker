import React from "react";
import Champion from "../Champion";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { singleChampData } from "./dataset";

test("champion doesn't render with no data", () => {
  const { queryByTestId } = render(<Champion data={null} />);

  const championStyled = queryByTestId("champion-styled");
  expect(championStyled).toBeNull();
});

test("champion renders with proper classes", () => {
  const data = Object.assign({}, singleChampData);

  const { getByTestId, rerender } = render(<Champion data={data} />);

  const championStyled = getByTestId("champion-styled");
  expect(championStyled.classList.contains("ChestGrantedFalse")).toBeTruthy();
  expect(championStyled.classList.contains("ChampOwnedTrue")).toBeTruthy();

  data.owned = false;
  data.mastery.chestGranted = true;

  rerender(<Champion data={data} />);

  expect(championStyled.classList.contains("ChestGrantedTrue")).toBeTruthy();
  expect(championStyled.classList.contains("ChampOwnedFalse")).toBeTruthy();
});

test("champion renders with proper spans", () => {
  const data = Object.assign({}, singleChampData);
  data.owned = false;

  const { getByText, rerender } = render(<Champion data={data} />);

  const buySpan = getByText(/buy/i);
  expect(buySpan).toBeTruthy();

  data.owned = true;
  data.mastery.chestGranted = true;

  rerender(<Champion data={data} />);

  const earnedSpan = getByText(/earned/i);
  expect(earnedSpan).toBeTruthy();
});
