import React, { FunctionComponent, useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import Champion from "./Champion";
import ChampionResultStyled from "./styles/ChampionResult.styled";

const ChampionsResult: FunctionComponent = () => {
  const browseChampData = useAppSelector(
    (state) => state.leagueReducer.browseChampData
  );

  useEffect(() => {
    browseChampData.sort((firstChamp, secondChamp) => {
      if (
        firstChamp.championData.name.toLowerCase() <
        secondChamp.championData.name.toLowerCase()
      ) {
        return -1;
      }

      if (
        firstChamp.championData.name.toLowerCase() >
        secondChamp.championData.name.toLowerCase()
      ) {
        return 1;
      }

      return 0;
    });
  }, [browseChampData]);

  return (
    <ChampionResultStyled>
      {browseChampData.map((x, i) => (
        <Champion data={x} key={i} />
      ))}
    </ChampionResultStyled>
  );
};

export default ChampionsResult;
