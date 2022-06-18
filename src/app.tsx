import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import LcuApi from "./APIs/lcu-api";
import GetLCUCredentials from "./APIs/lcu-connector";
import DDragonApi from "./APIs/ddragon-api";
import ChampionsResult from "./Components/ChampionsResult";
import LoadingComponent from "./Components/LoadingComponent";
import "./index.css";
import { ChampSelectSession } from "./APIs/lcu-types";
import { ChampionMasteryDTOWithData } from "./APIs/ddragon-types";

const credentials = GetLCUCredentials("D:/Riot Games/League of Legends/");

const lcuApi = LcuApi(credentials);

const ddragon = DDragonApi();

const App = () => {
  const [currentChamp, setCurrentChamp] = useState<
    ChampionMasteryDTOWithData | undefined
  >();
  const [data, setData] = useState<undefined | ChampionMasteryDTOWithData[]>();
  const [filteredData, setFilteredData] =
    useState<ChampionMasteryDTOWithData[]>();
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    if (lcuApi == null) {
      return;
    }
    lcuApi.GetCurrentSummoner().then(async (summoner) => {
      const masteries = await lcuApi.GetChampionMastery(summoner.summonerId);
      const rawData = await ddragon.PopulateChampData(masteries);
      setData(rawData);
      setFilteredData(rawData);
    });
  }, []);

  useEffect(() => {
    if (data === undefined) {
      return;
    }

    lcuApi.SetChampSelectSessionCallback(
      async (session: ChampSelectSession) => {
        const playerCellId = session.localPlayerCellId;
        if (playerCellId === -1) {
          setCurrentChamp(undefined);
          return;
        }

        const playerData = session.actions[0].find(
          (action) => action.actorCellId === playerCellId
        );

        const champ = data.find((c) => c.championId === playerData.championId);

        setCurrentChamp(champ);
      }
    );
  }, [data]);

  useEffect(() => {
    if (data === undefined) {
      return;
    }
    setFilteredData(
      data.filter((d) =>
        d.championData.name.toLowerCase().startsWith(filterInput.toLowerCase())
      )
    );
  }, [filterInput, data]);

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
