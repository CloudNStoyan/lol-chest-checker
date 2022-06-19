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
      <h2>Bench List</h2>
      <div className="bench-list">
        {champions.map((c, i) => (
          <Champion data={c} key={i} />
        ))}
      </div>
      <h2>Current Pick</h2>
      <div className="curr-champ">
        <Champion data={selectedChampion} />
      </div>
    </BenchedChampionsListStyled>
  );
};

export default BenchedChampionsList;
