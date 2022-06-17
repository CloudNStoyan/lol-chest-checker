import React, { FunctionComponent } from "react";
import type { ChampionMasteryDTOWithData } from "./ddragon-api";
import Champion from "./Champion";

type ChampionsProps = {
  data: ChampionMasteryDTOWithData[];
};

const ChampionsResult: FunctionComponent<ChampionsProps> = ({ data }) => {
  return (
    <div className="champion-list">
      {data.map((x, i) => (
        <Champion data={x} key={i} />
      ))}
    </div>
  );
};

export default ChampionsResult;
