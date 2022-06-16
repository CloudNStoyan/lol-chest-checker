import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import LcuApi, { ChampionMasteryDTO } from "./lcu-api";
import GetLCUCredentials from "./lcu-connector";
import DDragonApi from "./ddragon-api";
import ChampionsResult from "./ChampionsResult";
import type { ChampionDTO } from "./ddragon-api";

const credentials = GetLCUCredentials("D:/Riot Games/League of Legends/");

const lcuApi = LcuApi(credentials);

const ddragon = DDragonApi();

console.log(ddragon);

ddragon.GetVersions().then((x) => console.log(x[0]));

const App = () => {
  const [championMasteries, setChampionMasteries] =
    useState<(ChampionMasteryDTO & ChampionDTO)[]>();
  useEffect(() => {
    lcuApi.GetCurrentSummoner().then(async (summoner) => {
      const masteries = await lcuApi.GetChampionMastery(summoner.summonerId);
      const a = masteries.map((champMasteryDTO) => {
        const champDTO = ddragon.GetChampionDataByKey(
          champMasteryDTO.championId
        );
        return {
          ...champMasteryDTO,
          ...champDTO,
        };
      });
      console.log(a);
    });
  }, []);
  return lcuApi !== null ? <div></div> : <></>;
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
