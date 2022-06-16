import React, { FunctionComponent } from "react";
import { ChampionDTO } from "./ddragon-api";
import { ChampionMasteryDTO } from "./lcu-api";

type ChampionProps = {
  data: ChampionMasteryDTO & ChampionDTO;
};

const Champion: FunctionComponent<ChampionProps> = ({ data }) => {
  return <div>{data.name}</div>;
};

export default Champion;
