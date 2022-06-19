import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import LcuApi from "./APIs/lcu-api";
import GetLCUCredentials from "./APIs/lcu-connector";
import ChampionsResult from "./Components/ChampionsResult";
import LoadingComponent from "./Components/LoadingComponent";
import "./index.css";
import useChampData from "./Hooks/useChampData";
import ChampionWrapperStyled from "./Components/ChampionWrapper.styled";
import BenchedChampionsList from "./Components/BenchedChampionsList";
import fs from "fs";
import { ChampionMasteryDTOWithData } from "./APIs/ddragon-types";

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const credentials = GetLCUCredentials(config.pathToLeagueOfLegends);

const lcuApi = LcuApi(credentials);

const App = () => {
  const [filterInput, setFilterInput] = useState("");

  const [data, filteredData, currentChamp, benchedChampions] = useChampData(
    lcuApi,
    filterInput
  );

  return data !== undefined ? (
    <ChampionWrapperStyled>
      {currentChamp && (
        <BenchedChampionsList
          champions={benchedChampions}
          selectedChampion={currentChamp}
          onChampSelected={(c: ChampionMasteryDTOWithData) =>
            lcuApi.SwapWithChampion(c.championId)
          }
        />
      )}
      <h2>Browse Champions</h2>
      <div>
        <input
          placeholder="Champion name.."
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
        <ChampionsResult data={filteredData} />
      </div>
    </ChampionWrapperStyled>
  ) : (
    <LoadingComponent />
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
