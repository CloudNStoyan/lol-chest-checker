import React, { FunctionComponent } from "react";
import BenchedChampionsListStyled from "./styles/BenchedChampionsList.styled";
import Champion from "./Champion";
import ClickableChampion from "./ClickableChampion";
import { useAppSelector } from "../store/hooks";
import useLcu from "../Hooks/useLcu";

const BenchedChampionsList: FunctionComponent = () => {
  const { benchedChampions, selectedChampion } = useAppSelector(
    (state) => state.leagueReducer
  );

  const [lcu] = useLcu();
  return (
    <BenchedChampionsListStyled>
      {benchedChampions.length > 0 && (
        <>
          <h2>Bench List</h2>
          <div className="bench-list">
            {benchedChampions.map((c, i) => (
              <ClickableChampion
                onClick={() => lcu.SwapWithChampion(c.championId)}
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
