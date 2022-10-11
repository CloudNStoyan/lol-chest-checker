import React, { FunctionComponent } from "react";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import OutsideLink from "./OutsideLink";
import UsefulLinksStyled from "./styles/UsefulLinks.styled";

const CreateOpggLink = (championId: string) =>
  `https://kr.op.gg/champions/${championId}/?region=kr&tier=platinum_plus`;

const CreateOpggAramLink = (championId: string) =>
  `https://www.op.gg/modes/aram/${championId}/build?region=global`;

type UsefulLinksProps = {
  currentPick: ChampionMasteryDTOWithData;
};

const UsefulLinks: FunctionComponent<UsefulLinksProps> = ({ currentPick }) => {
  const championId = currentPick.championData.id;
  const opggLink = CreateOpggLink(championId);
  const opggAramLink = CreateOpggAramLink(championId);

  return (
    currentPick && (
      <UsefulLinksStyled>
        <OutsideLink text="OP.GG" src={opggLink} />
        <OutsideLink text="ARAM" src={opggAramLink} />
      </UsefulLinksStyled>
    )
  );
};

export default UsefulLinks;
