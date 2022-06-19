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
  const [currentChamp, setCurrentChamp] =
    useState<ChampionMasteryDTOWithData>();
  const [data, setData] = useState<ChampionMasteryDTOWithData[]>();
  const [champBrowseData, setChampBrowseData] =
    useState<ChampionMasteryDTOWithData[]>();
  const [benchIds, setBenchIds] = useState<ChampionMasteryDTOWithData[]>([]);

  useEffect(() => {
    if (lcuApi == null) {
      return;
    }

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
    setChampBrowseData(
      data.filter((d) =>
        d.championData.name.toLowerCase().startsWith(filterInput.toLowerCase())
      )
    );
  }, [filterInput, data]);

  return [champBrowseData, benchIds, currentChamp];
};

export default useChampData;
