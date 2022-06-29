import React, { FunctionComponent, useEffect } from "react";
import BenchedChampionsList from "./BenchedChampionsList";
import ChampionsResult from "./ChampionsResult";
import ChampionWrapperStyled from "./styles/ChampionWrapper.styled";
import ChampionsResultFilters from "./ChampionsResultFilters";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  GetChampionMastery,
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
import {
  setBenchedChampsData,
  setBrowseChampData,
  setSelectedChampion,
} from "../store/leagueSlice";

const ddragon = DDragonApi();

const ChampionWrapper: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const credentials = useAppSelector(
    (state) => state.leagueReducer.lcuCredentials
  );

  useEffect(() => {
    GetCurrentSummoner(credentials).then(async (summoner: SummonerDTO) => {
      const masteries = await GetChampionMastery(
        credentials,
        summoner.summonerId
      );
      const data = await ddragon.PopulateChampData(masteries);
      dispatch(setBrowseChampData(data));

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

        const champ = data.find((c) => c.championId === playerData.championId);

        const benchChamps = data.filter((c) =>
          session.benchChampionIds.includes(c.championId)
        );

        dispatch(setSelectedChampion(champ));
        dispatch(setBenchedChampsData(benchChamps));
      });
    });

    GetChestEligibility(credentials).then(
      (chestEligibility: ChestEligibilityDTO) => {
        console.log(chestEligibility);
      }
    );
  }, [credentials]);

  return (
    <ChampionWrapperStyled>
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
