import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import LcuApi from "./APIs/lcu-api";
import GetLCUCredentials from "./APIs/lcu-connector";
import ChampionsResult from "./Components/ChampionsResult";
import LoadingComponent from "./Components/LoadingComponent";
import "./index.css";
import useChampData from "./Hooks/useChampData";

const credentials = GetLCUCredentials("D:/Riot Games/League of Legends/");

const lcuApi = LcuApi(credentials);

const App = () => {
  const [filterInput, setFilterInput] = useState("");

  const [data, filteredData, currentChamp] = useChampData(lcuApi, filterInput);

  return data !== undefined ? (
    <div>
      <input
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
      />
      <ChampionsResult data={filteredData} selectedChamp={currentChamp} />
    </div>
  ) : (
    <LoadingComponent />
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
