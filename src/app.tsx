import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import StartComponent from "./Components/StartComponent";
import GlobalStyled from "./Global";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyled />
      <StartComponent />
    </Provider>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
