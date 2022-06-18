import React, { FunctionComponent } from "react";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import Champion from "./Champion";
import ChampionResultStyled from "./ChampionResult.styled";

type ChampionsProps = {
  data: ChampionMasteryDTOWithData[];
};

const ChampionsResult: FunctionComponent<ChampionsProps> = ({ data }) => {
  return (
    <ChampionResultStyled>
      {data.map((x, i) => (
        <Champion data={x} key={i} />
      ))}
    </ChampionResultStyled>
  );
};

export default ChampionsResult;
