import React from "react";
import StartComponent from "../StartComponent";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { SetupConfig } from "../../store/configSlice";
import { act } from "react-dom/test-utils";
import fs from "fs";

beforeEach(() => {
  const mockStorage: { [key: string]: string } = {};
  Storage.prototype.setItem = (key: string, value: string) => {
    mockStorage[key] = value;
  };

  Storage.prototype.getItem = (key: string) => mockStorage[key];
});

test("start component state rendering works properly", () => {
  const { getByText } = render(
    <Provider store={store}>
      <StartComponent />
    </Provider>
  );

  expect(getByText(/couldn't locate league of legends/i)).toBeTruthy();

  const newConfig: SetupConfig = {
    pathToLeagueOfLegends: "",
    pathToLeagueOfLegendsIsValid: true,
  };

  fs.existsSync = (path: string) => {
    if (path.endsWith("lockfile")) {
      return false;
    }

    return true;
  };

  act(() => {
    store.dispatch({ type: "config/setConfig", payload: newConfig });
  });

  expect(
    getByText(/Please start the League Client first and restart the app or/i)
  ).toBeTruthy();
});
