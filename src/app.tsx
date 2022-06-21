import React from "react";
import { createRoot } from "react-dom/client";
import StartComponent from "./Components/StartComponent";
import GlobalStyled from "./Global";

const App = () => {
  return (
    <>
      <GlobalStyled />
      <StartComponent />
    </>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
