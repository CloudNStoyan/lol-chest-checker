import { useEffect, useState } from "react";
import type {
  ChampSelectSession,
  ConnectedLcuApi,
  SummonerDTO,
} from "../APIs/lcu-types";
import DDragonApi from "../APIs/ddragon-api";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";

export type ChampData = [
  ChampionMasteryDTOWithData[],
  ChampionMasteryDTOWithData[],
  ChampionMasteryDTOWithData
];

const ddragon = DDragonApi();

const useChampData = (
  lcuApi: ConnectedLcuApi,
  filterInput: string,
  showEarned: boolean
): ChampData => {
  const [currentChamp, setCurrentChamp] =
    useState<ChampionMasteryDTOWithData>();
  const [data, setData] = useState<ChampionMasteryDTOWithData[]>();
  const [champBrowseData, setChampBrowseData] =
    useState<ChampionMasteryDTOWithData[]>();
  const [benchIds, setBenchIds] = useState<ChampionMasteryDTOWithData[]>([]);

  useEffect(() => {
    lcuApi.GetCurrentSummoner().then(async (summoner: SummonerDTO) => {
      const masteries = await lcuApi.GetChampionMastery(summoner.summonerId);
      const rawData = await ddragon.PopulateChampData(masteries);
      setData(rawData);
      setChampBrowseData(rawData);
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
          setBenchIds([]);
          return;
        }

        const playerData = session.myTeam.find(
          (c) => c.cellId === playerCellId
        );

        const champ = data.find((c) => c.championId === playerData.championId);

        const benchChamps = data.filter((c) =>
          session.benchChampionIds.includes(c.championId)
        );

        setCurrentChamp(champ);
        setBenchIds(benchChamps);
      }
    );
  }, [data]);

  useEffect(() => {
    if (data === undefined) {
      return;
    }

    let filteredData = data.filter((d) =>
      d.championData.name.toLowerCase().startsWith(filterInput.toLowerCase())
    );

    if (!showEarned) {
      filteredData = filteredData.filter((x) => !x.chestGranted);
    }

    setChampBrowseData(filteredData);
  }, [filterInput, data, showEarned]);

  return [champBrowseData, benchIds, currentChamp];
};

export default useChampData;
