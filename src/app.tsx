import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import LcuApi from "./lcu-api";
import GetLCUCredentials from "./lcu-connector";
import DDragonApi, { ChampionMasteryDTOWithData } from "./ddragon-api";
import ChampionsResult from "./ChampionsResult";
import LoadingComponent from "./LoadingComponent";
import "./index.css";

const credentials = GetLCUCredentials("D:/Riot Games/League of Legends/");

const lcuApi = LcuApi(credentials);

const ddragon = DDragonApi();

console.log(lcuApi);

const App = () => {
  const [currentChampId, setCurrentChampId] = useState(0);
  const [data, setData] = useState<undefined | ChampionMasteryDTOWithData[]>();
  const [filteredData, setFilteredData] =
    useState<ChampionMasteryDTOWithData[]>();
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    console.log(credentials);
    if (lcuApi == null) {
      return;
    }
    lcuApi.GetCurrentSummoner().then(async (summoner) => {
      const masteries = await lcuApi.GetChampionMastery(summoner.summonerId);
      const rawData = await ddragon.PopulateChampData(masteries);
      setData(rawData);
      setFilteredData(rawData);
    });

    // lcuApi.OnChampSelect((session) => {
    //   const playerCellId = session.localPlayerCellId;
    //   const playerInfo = session.actions[0].find(
    //     (action) => action.actorCellId === playerCellId
    //   );

    //   if (currentChampId != playerInfo.championId) {
    //     setCurrentChampId(playerInfo.championId);
    //   }
    // });
  }, []);

  useEffect(() => console.log(currentChampId), [currentChampId]);

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
      <ChampionsResult data={filteredData} />
    </div>
  ) : (
    <LoadingComponent />
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
