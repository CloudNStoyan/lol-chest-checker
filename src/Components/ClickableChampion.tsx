import React, { FunctionComponent } from "react";
import Champion from "./Champion";
import type { ChampionProps } from "./Champion";

export type ClickableChampionProps = ChampionProps & {
  onClick: () => void;
};

const ClickableChampion: FunctionComponent<ClickableChampionProps> = ({
  data,
  onClick,
}) => {
  return (
    <a href="#" onClick={onClick}>
      <Champion data={data} />
    </a>
  );
};

export default ClickableChampion;
