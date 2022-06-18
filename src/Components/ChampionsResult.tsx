import React, { FunctionComponent } from "react";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import Champion from "./Champion";

type ChampionsProps = {
  data: ChampionMasteryDTOWithData[];
  selectedChamp: ChampionMasteryDTOWithData;
};

const ChampionsResult: FunctionComponent<ChampionsProps> = ({
  data,
  selectedChamp,
}) => {
  return (
    <div className="champion-list">
      <Champion data={selectedChamp} />
      {data.map((x, i) => (
        <Champion data={x} key={i} />
      ))}
    </div>
  );
};

export default ChampionsResult;
