import React, { FunctionComponent } from "react";
import type { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import BenchedChampionsListStyled from "./BenchedChampionsList.styled";
import Champion from "./Champion";

export type BenchedChampionsListProps = {
  selectedChampion: ChampionMasteryDTOWithData;
  champions: ChampionMasteryDTOWithData[];
};

const BenchedChampionsList: FunctionComponent<BenchedChampionsListProps> = ({
  selectedChampion,
  champions,
}) => {
  return (
    <BenchedChampionsListStyled>
      <div>
        <Champion data={selectedChampion} />
      </div>
      <div>
        {champions.map((c, i) => (
          <Champion data={c} key={i} />
        ))}
      </div>
    </BenchedChampionsListStyled>
  );
};

export default BenchedChampionsList;
