import React, { FunctionComponent, useEffect } from "react";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import Champion from "./Champion";
import ChampionResultStyled from "./styles/ChampionResult.styled";

type ChampionsProps = {
  data: ChampionMasteryDTOWithData[];
};

const ChampionsResult: FunctionComponent<ChampionsProps> = ({ data }) => {
  useEffect(() => {
    data.sort((firstChamp, secondChamp) => {
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
  }, [data]);

  return (
    <ChampionResultStyled>
      {data.map((x, i) => (
        <Champion data={x} key={i} />
      ))}
    </ChampionResultStyled>
  );
};

export default ChampionsResult;
