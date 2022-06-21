import React, { useState } from "react";
import ConfigCreator from "../ConfigCreator";
import SetupComponent from "./SetupComponent";
import LcuApi from "../APIs/lcu-api";
import LoadingComponent from "./LoadingComponent";
import ChampionWrapper from "./ChampionWrapper";

const { config, SaveConfig, CheckIfPathIsValid } = ConfigCreator();

const StartComponent = () => {
  const [currentConfig, setCurrentConfig] = useState(config);

  if (!currentConfig.pathToLeagueOfLegendsIsValid) {
    return (
      <SetupComponent
        config={currentConfig}
        setConfig={setCurrentConfig}
        saveConfig={SaveConfig}
        checkIfPathIsValid={CheckIfPathIsValid}
      />
    );
  }

  const lcuApi = LcuApi(currentConfig.pathToLeagueOfLegends);

  if (lcuApi.clientIsNotOpen === true) {
    return <LoadingComponent />;
  }

  return <ChampionWrapper lcuApi={lcuApi} />;
};

export default StartComponent;
