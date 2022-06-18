import { useEffect, useState } from "react";
import type {
  ChampSelectSession,
  LcuApi,
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
  lcuApi: LcuApi | null,
  filterInput: string
): ChampData => {
  const [currentChamp, setCurrentChamp] = useState<
    ChampionMasteryDTOWithData | undefined
  >();
  const [data, setData] = useState<undefined | ChampionMasteryDTOWithData[]>();
  const [filteredData, setFilteredData] =
    useState<ChampionMasteryDTOWithData[]>();

  useEffect(() => {
    if (lcuApi == null) {
      return;
    }

    lcuApi.GetCurrentSummoner().then(async (summoner: SummonerDTO) => {
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

  return [data, filteredData, currentChamp];
};

export default useChampData;
