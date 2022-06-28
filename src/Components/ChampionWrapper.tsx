import React, { FunctionComponent } from "react";
import BenchedChampionsList from "./BenchedChampionsList";
import ChampionsResult from "./ChampionsResult";
import ChampionWrapperStyled from "./styles/ChampionWrapper.styled";
import ChampionsResultFilters from "./ChampionsResultFilters";

const ChampionWrapper: FunctionComponent = () => {
  return (
    <ChampionWrapperStyled>
      <BenchedChampionsList />
      <h2>Browse Champions</h2>
      <div>
        <ChampionsResultFilters />
        <ChampionsResult />
      </div>
    </ChampionWrapperStyled>
  );
};

export default ChampionWrapper;
