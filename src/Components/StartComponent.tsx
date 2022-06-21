import React from "react";
import SetupComponent from "./SetupComponent";
import LcuApi from "../APIs/lcu-api";
import LoadingComponent from "./LoadingComponent";
import ChampionWrapper from "./ChampionWrapper";
import useConfig from "../Hooks/useConfig";

const StartComponent = () => {
  const [config, setConfig] = useConfig();

  if (!config.pathToLeagueOfLegendsIsValid) {
    return <SetupComponent config={config} setConfig={setConfig} />;
  }

  const lcuApi = LcuApi(config.pathToLeagueOfLegends);

  if (lcuApi.clientIsNotOpen === true) {
    return <LoadingComponent />;
  }

  return <ChampionWrapper lcuApi={lcuApi} />;
};

export default StartComponent;
