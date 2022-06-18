import React, { FunctionComponent } from "react";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import Champion from "./Champion";
import ChampionResultStyled from "./ChampionResult.styled";

type ChampionsProps = {
  data: ChampionMasteryDTOWithData[];
  selectedChamp: ChampionMasteryDTOWithData;
};

const ChampionsResult: FunctionComponent<ChampionsProps> = ({
  data,
  selectedChamp,
}) => {
  return (
    <ChampionResultStyled>
      <Champion data={selectedChamp} />
      {data.map((x, i) => (
        <Champion data={x} key={i} />
      ))}
    </ChampionResultStyled>
  );
};

export default ChampionsResult;
