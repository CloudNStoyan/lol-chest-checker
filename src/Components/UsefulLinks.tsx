import React, { FunctionComponent } from "react";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";
import OutsideLink from "./OutsideLink";
import UsefulLinksStyled from "./styles/UsefulLinks.styled";

const CreateOpggLink = (championId: string) =>
  `https://kr.op.gg/champions/${championId}/?region=kr&tier=platinum_plus`;

type UsefulLinksProps = {
  currentPick: ChampionMasteryDTOWithData;
};

const UsefulLinks: FunctionComponent<UsefulLinksProps> = ({ currentPick }) => {
  const opggLink = CreateOpggLink(currentPick.championData.id);
  return (
    currentPick && (
      <UsefulLinksStyled>
        <OutsideLink text="OP.GG" src={opggLink} />
      </UsefulLinksStyled>
    )
  );
};

export default UsefulLinks;
