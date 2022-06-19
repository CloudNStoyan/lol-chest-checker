import React, { FunctionComponent, useState } from "react";
import useChampData from "../Hooks/useChampData";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import { LcuApi } from "../APIs/lcu-types";
import BenchedChampionsList from "./BenchedChampionsList";
import ChampionsResult from "./ChampionsResult";
import ChampionWrapperStyled from "./ChampionWrapper.styled";

export type ChampionWrapperProps = {
  lcuApi: LcuApi;
};

const ChampionWrapper: FunctionComponent<ChampionWrapperProps> = ({
  lcuApi,
}) => {
  const [filterInput, setFilterInput] = useState("");
  const [champBrowseData, benchedChampions, currentChamp] = useChampData(
    lcuApi,
    filterInput
  );

  return (
    <ChampionWrapperStyled>
      {currentChamp && (
        <BenchedChampionsList
          champions={benchedChampions}
          selectedChampion={currentChamp}
          onChampSelected={(c: ChampionMasteryDTOWithData) =>
            lcuApi.SwapWithChampion(c.championId)
          }
        />
      )}
      <h2>Browse Champions</h2>
      <div>
        <input
          placeholder="Champion name.."
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
        <ChampionsResult data={champBrowseData} />
      </div>
    </ChampionWrapperStyled>
  );
};

export default ChampionWrapper;
