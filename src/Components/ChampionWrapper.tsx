import React, { FunctionComponent, useEffect } from "react";
import BenchedChampionsList from "./BenchedChampionsList";
import ChampionsResult from "./ChampionsResult";
import ChampionWrapperStyled from "./styles/ChampionWrapper.styled";
import ChampionsResultFilters from "./ChampionsResultFilters";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  GetChampionMastery,
  GetChampionsMinimal,
  GetChestEligibility,
  GetCurrentSummoner,
  OnChampSelect,
} from "../APIs/lcu-client";
import {
  ChampSelectSession,
  ChestEligibilityDTO,
  SummonerDTO,
} from "../APIs/lcu-types";
import DDragonApi from "../APIs/ddragon-api";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import {
  setBenchedChampsData,
  setBrowseChampData,
  setChestEligibility,
  setSelectedChampion,
} from "../store/leagueSlice";
import HextechChestTracker from "./HextechChestTracker";

const ddragon = DDragonApi();

const ChampionWrapper: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const credentials = useAppSelector(
    (state) => state.leagueReducer.lcuCredentials
  );

  useEffect(() => {
    GetCurrentSummoner(credentials).then(async (summoner: SummonerDTO) => {
      const masteryChampData = await GetChampionMastery(
        credentials,
        summoner.summonerId
      );

      const summonersChampsInfo = await GetChampionsMinimal(credentials);

      const latestVersion = (await ddragon.GetVersions())[0];
      const championsJson = await ddragon.GetChampionData(latestVersion);
      const champs = Object.values(championsJson.data);

      const champsData = champs.map((champ) => {
        const mastery = masteryChampData.find(
          (c) => c.championId.toString() === champ.key
        );

        const champInfoMinimal = summonersChampsInfo.find(
          (c) => c.id.toString() === champ.key
        );

        const champData: ChampionMasteryDTOWithData = {
          championData: champ,
          mastery,
          owned: champInfoMinimal?.ownership.owned,
        };

        return champData;
      });

      dispatch(setBrowseChampData(champsData));

      OnChampSelect(credentials, async (session: ChampSelectSession) => {
        const playerCellId = session.localPlayerCellId;
        if (playerCellId === -1) {
          dispatch(setSelectedChampion(undefined));
          dispatch(setBenchedChampsData([]));
          return;
        }

        const playerData = session.myTeam.find(
          (c) => c.cellId === playerCellId
        );

        const champ = champsData.find(
          (c) => Number(c.championData.key) === playerData.championId
        );

        const benchChamps = champsData.filter((c) =>
          session.benchChampionIds.includes(Number(c.championData.key))
        );

        dispatch(setSelectedChampion(champ));
        dispatch(setBenchedChampsData(benchChamps));
      });
    });

    GetChestEligibility(credentials).then(
      (chestEligibility: ChestEligibilityDTO) => {
        dispatch(setChestEligibility(chestEligibility));
      }
    );
  }, [credentials]);

  return (
    <ChampionWrapperStyled>
      <HextechChestTracker />
      <BenchedChampionsList />
      <h2>Browse Champions</h2>
      <div>
        <ChampionsResultFilters />
        <ChampionsResult />
      </div>
    </ChampionWrapperStyled>
  );
};

export default ChampionWrapper;
