import React, { FunctionComponent, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import Champion from "./Champion";
import ChampionResultStyled from "./styles/ChampionResult.styled";

const ChampionsResult: FunctionComponent = () => {
  const { browseChampData, browseChampDataFilter } = useAppSelector(
    (state) => state.leagueReducer
  );

  const [filteredChampData, setFilteredChampData] = useState(browseChampData);

  useEffect(() => {
    if (
      !browseChampData ||
      !browseChampDataFilter ||
      browseChampData.length === 0
    ) {
      return;
    }

    let data = [...browseChampData];

    data = data.filter((d) =>
      d.championData.name
        .toLowerCase()
        .startsWith(browseChampDataFilter.filter.toLowerCase())
    );

    if (!browseChampDataFilter.showEarned) {
      data = data.filter((x) => !x.chestGranted);
    }

    setFilteredChampData(data);
  }, [browseChampData, browseChampDataFilter]);

  return (
    <ChampionResultStyled>
      {filteredChampData.map((x, i) => (
        <Champion data={x} key={i} />
      ))}
    </ChampionResultStyled>
  );
};

export default ChampionsResult;
