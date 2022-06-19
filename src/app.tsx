import React from "react";
import { createRoot } from "react-dom/client";
import LcuApi from "./APIs/lcu-api";
import GetLCUCredentials from "./APIs/lcu-connector";
import LoadingComponent from "./Components/LoadingComponent";
import "./index.css";
import fs from "fs";
import ChampionWrapper from "./Components/ChampionWrapper";

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const credentials = GetLCUCredentials(config.pathToLeagueOfLegends);

const lcuApi = LcuApi(credentials);

const App = () => {
  const clientIsNotOpen = lcuApi === null;
  return clientIsNotOpen ? (
    <LoadingComponent />
  ) : (
    <ChampionWrapper lcuApi={lcuApi} />
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
