import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import LcuApi from "./APIs/lcu-api";
import GetLCUCredentials from "./APIs/lcu-connector";
import ChampionsResult from "./Components/ChampionsResult";
import LoadingComponent from "./Components/LoadingComponent";
import "./index.css";
import useChampData from "./Hooks/useChampData";
import ChampionWrapperStyled from "./Components/ChampionWrapper.styled";

const credentials = GetLCUCredentials("D:/Riot Games/League of Legends/");

const lcuApi = LcuApi(credentials);

const App = () => {
  const [filterInput, setFilterInput] = useState("");

  const [data, filteredData, currentChamp] = useChampData(lcuApi, filterInput);

  return data !== undefined ? (
    <ChampionWrapperStyled>
      <input
        placeholder="Champion name.."
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
      />
      <ChampionsResult data={filteredData} selectedChamp={currentChamp} />
    </ChampionWrapperStyled>
  ) : (
    <LoadingComponent />
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
