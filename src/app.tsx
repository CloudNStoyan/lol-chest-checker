import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import LcuApi from "./APIs/lcu-api";
import LoadingComponent from "./Components/LoadingComponent";
import ChampionWrapper from "./Components/ChampionWrapper";
import ConfigCreator from "./ConfigCreator";
import SetupComponent from "./Components/SetupComponent";
import "./index.css";

const { config, SaveConfig, CheckIfPathIsValid } = ConfigCreator();

const App = () => {
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

const root = createRoot(document.getElementById("root"));

root.render(<App />);
