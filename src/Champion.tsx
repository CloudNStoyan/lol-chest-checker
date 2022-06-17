import React, { FunctionComponent } from "react";
import { ChampionMasteryDTOWithData } from "./ddragon-api";

type ChampionProps = {
  data: ChampionMasteryDTOWithData;
};

const Champion: FunctionComponent<ChampionProps> = ({ data }) => {
  const img = `http://ddragon.leagueoflegends.com/cdn/12.11.1/img/champion/${data.championData.id}.png`;
  const additionalClassName = data.chestGranted ? "EARNED" : "AVAILABLE";
  return (
    <div className={`champion ${additionalClassName}`}>
      {additionalClassName === "EARNED" ? <span>EARNED</span> : <></>}
      <img src={img} />
    </div>
  );
};

export default Champion;
