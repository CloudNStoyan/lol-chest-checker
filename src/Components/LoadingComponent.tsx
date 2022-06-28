import React, { useEffect } from "react";
import DDragonApi from "../APIs/ddragon-api";
import { ChestEligibilityDTO, SummonerDTO } from "../APIs/lcu-types";
import useLcu from "../Hooks/useLcu";
import { useAppDispatch } from "../store/hooks";
import { setBrowseChampData, setRawChampData } from "../store/leagueSlice";
import LoadingComponentStyled from "./styles/LoadingComponent.styled";

const LoadingComponent = () => {
  const dispatch = useAppDispatch();
  const [lcuApi] = useLcu();

  useEffect(() => console.log(lcuApi), [lcuApi]);

  useEffect(() => {
    const ddragon = DDragonApi();

    lcuApi.GetCurrentSummoner().then(async (summoner: SummonerDTO) => {
      console.log(lcuApi, summoner);
      const masteries = await lcuApi.GetChampionMastery(summoner.summonerId);
      const browseChampData = await ddragon.PopulateChampData(masteries);

      dispatch(setRawChampData(browseChampData));
      dispatch(setBrowseChampData(browseChampData));
    });

    lcuApi
      .GetChestEligibility()
      .then((chestEligibility: ChestEligibilityDTO) => {
        console.log(chestEligibility);
      });
  }, []);

  return (
    <LoadingComponentStyled>
      Please start the League Client first and restart the app or{" "}
      <a href="#" onClick={() => location.reload()}>
        click here
      </a>
      .
    </LoadingComponentStyled>
  );
};

export default LoadingComponent;
