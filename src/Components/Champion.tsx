import React, { FunctionComponent } from "react";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import ChampionStyled from "./Champion.styled";

export type ChampionProps = {
  data: ChampionMasteryDTOWithData;
};

const Champion: FunctionComponent<ChampionProps> = ({ data }) => {
  if (data === undefined) {
    return <></>;
  }

  const img = `http://ddragon.leagueoflegends.com/cdn/12.11.1/img/champion/${data.championData.id}.png`;
  const additionalClassName = data.chestGranted ? "EARNED" : "AVAILABLE";
  return (
    <ChampionStyled className={additionalClassName}>
      {additionalClassName === "EARNED" ? <span>EARNED</span> : <></>}
      <img src={img} />
    </ChampionStyled>
  );
};

export default Champion;
