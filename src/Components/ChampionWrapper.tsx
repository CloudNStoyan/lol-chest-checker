import React, { FunctionComponent, useState } from "react";
import useChampData from "../Hooks/useChampData";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import { ConnectedLcuApi } from "../APIs/lcu-types";
import BenchedChampionsList from "./BenchedChampionsList";
import ChampionsResult from "./ChampionsResult";
import ChampionWrapperStyled from "./ChampionWrapper.styled";
import ChampionsResultFilters from "./ChampionsResultFilters";

export type ChampionWrapperProps = {
  lcuApi: ConnectedLcuApi;
};

const ChampionWrapper: FunctionComponent<ChampionWrapperProps> = ({
  lcuApi,
}) => {
  const [filterInput, setFilterInput] = useState("");
  const [showEarned, setShowEarned] = useState(true);

  const [champBrowseData, benchedChampions, currentChamp] = useChampData(
    lcuApi,
    filterInput,
    showEarned
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
        <ChampionsResultFilters
          filterInput={filterInput}
          setFilterInput={setFilterInput}
          showEarned={showEarned}
          setShowEarned={setShowEarned}
        />
        {champBrowseData && <ChampionsResult data={champBrowseData} />}
      </div>
    </ChampionWrapperStyled>
  );
};

export default ChampionWrapper;
