import React from "react";
import SetupComponent from "./SetupComponent";
import LoadingComponent from "./LoadingComponent";
import ChampionWrapper from "./ChampionWrapper";
import useConfig from "../Hooks/useConfig";

const StartComponent = () => {
  const [config, clientIsOpen] = useConfig();

  if (!config.pathToLeagueOfLegendsIsValid) {
    return <SetupComponent />;
  }

  if (clientIsOpen === false) {
    return <LoadingComponent />;
  }

  return <ChampionWrapper />;
};

export default StartComponent;
