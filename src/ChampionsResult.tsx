import React, { FunctionComponent } from "react";
import { ChampionDTO } from "./ddragon-api";
import { ChampionMasteryDTO } from "./lcu-api";
import Champion from "./Champion";

type ChampionsProps = {
  data: (ChampionMasteryDTO & ChampionDTO)[];
};

const ChampionsResult: FunctionComponent<ChampionsProps> = ({ data }) => {
  return (
    <div>
      {data.map((x) => (
        <Champion data={x} />
      ))}
    </div>
  );
};

export default ChampionsResult;
