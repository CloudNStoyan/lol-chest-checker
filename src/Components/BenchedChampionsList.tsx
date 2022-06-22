import React, { FunctionComponent } from "react";
import type { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import BenchedChampionsListStyled from "./styles/BenchedChampionsList.styled";
import Champion from "./Champion";
import ClickableChampion from "./ClickableChampion";

export type BenchedChampionsListProps = {
  selectedChampion: ChampionMasteryDTOWithData;
  champions: ChampionMasteryDTOWithData[];
  onChampSelected: (c: ChampionMasteryDTOWithData) => void;
};

const BenchedChampionsList: FunctionComponent<BenchedChampionsListProps> = ({
  selectedChampion,
  champions,
  onChampSelected,
}) => {
  return (
    <BenchedChampionsListStyled>
      {champions.length > 0 && (
        <>
          <h2>Bench List</h2>
          <div className="bench-list">
            {champions.map((c, i) => (
              <ClickableChampion
                onClick={() => onChampSelected(c)}
                data={c}
                key={i}
              />
            ))}
          </div>
        </>
      )}
      <h2>Current Pick</h2>
      <div className="curr-champ">
        <Champion data={selectedChampion} />
      </div>
    </BenchedChampionsListStyled>
  );
};

export default BenchedChampionsList;
