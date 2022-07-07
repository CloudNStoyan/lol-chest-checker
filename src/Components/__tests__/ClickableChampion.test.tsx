import React from "react";
import ClickableChampion from "../ClickableChampion";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { singleChampData } from "./dataset";

test("clickable champion on click fn is invoked", () => {
  const onClick = jest.fn();

  const { getByTestId } = render(
    <ClickableChampion data={singleChampData} onClick={onClick} />
  );

  const btn = getByTestId("button");

  fireEvent.click(btn);

  expect(onClick).toBeCalled();
});
