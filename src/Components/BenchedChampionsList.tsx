import React, { FunctionComponent } from "react";
import BenchedChampionsListStyled from "./styles/BenchedChampionsList.styled";
import Champion from "./Champion";
import ClickableChampion from "./ClickableChampion";
import { useAppSelector } from "../store/hooks";
import { SwapWithChampion } from "../APIs/lcu-client";
import UsefulLinks from "./UsefulLinks";

const BenchedChampionsList: FunctionComponent = () => {
  const { benchedChampions, selectedChampion } = useAppSelector(
    (state) => state.leagueReducer
  );

  return (
    <BenchedChampionsListStyled>
      {benchedChampions.length > 0 && (
        <>
          <h2>Bench List</h2>
          <div className="bench-list">
            {benchedChampions.map((c, i) => (
              <ClickableChampion
                onClick={() => SwapWithChampion(Number(c.championData.key))}
                data={c}
                key={i}
              />
            ))}
          </div>
        </>
      )}
      {selectedChampion && (
        <>
          <h2>Current Pick</h2>
          <div className="curr-champ">
            <Champion data={selectedChampion} />
            <UsefulLinks currentPick={selectedChampion} />
          </div>
        </>
      )}
    </BenchedChampionsListStyled>
  );
};

export default BenchedChampionsList;
