import React from "react";
import OutsideLink from "../OutsideLink";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("outside link renders properly", () => {
  const { getByTestId } = render(
    <OutsideLink src="google.com" text="Google" className="test-my-classname" />
  );

  const link = getByTestId("link");
  expect(link.textContent).toBe("Google");
  expect(link.classList.contains("test-my-classname")).toBeTruthy();
});
