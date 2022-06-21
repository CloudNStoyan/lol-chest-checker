import React, { useEffect, useState } from "react";
import fs from "fs";
import path from "path";

export type SetupConfig = {
  pathToLeagueOfLegends: string;
  pathToLeagueOfLegendsIsValid: boolean;
};

export type UseConfigReturns = [
  SetupConfig,
  React.Dispatch<React.SetStateAction<SetupConfig>>
];

const localStorageKey = "__LCC_CONFIG__";

const configIsValid = (config: SetupConfig) => {
  if (!config) {
    return;
  }

  const directoryExists = fs.existsSync(config?.pathToLeagueOfLegends);

  if (!directoryExists) {
    return false;
  }

  const isTheLeagueFolder = fs.existsSync(
    path.join(config.pathToLeagueOfLegends, "LeagueClientUx.exe")
  );

  return isTheLeagueFolder;
};

const initialValue: SetupConfig = {
  pathToLeagueOfLegends: null,
  pathToLeagueOfLegendsIsValid: false,
};

const useConfig = (): UseConfigReturns => {
  const [config, setConfig] = useState(initialValue);

  useEffect(() => {
    const retrievedData = localStorage.getItem(localStorageKey);

    let retrievedConfig: SetupConfig = null;

    if (retrievedData) {
      try {
        retrievedConfig = JSON.parse(retrievedData);
      } catch (error) {
        retrievedConfig = null;
      }
    }

    if (!retrievedConfig || !configIsValid(retrievedConfig)) {
      return;
    }

    setConfig(retrievedConfig);
  }, []);

  useEffect(() => {
    const isConfigValid = configIsValid(config);
    if (!isConfigValid && config.pathToLeagueOfLegendsIsValid) {
      setConfig({
        pathToLeagueOfLegends: config.pathToLeagueOfLegends,
        pathToLeagueOfLegendsIsValid: false,
      });

      return;
    }

    if (isConfigValid && !config.pathToLeagueOfLegendsIsValid) {
      setConfig({
        pathToLeagueOfLegends: config.pathToLeagueOfLegends,
        pathToLeagueOfLegendsIsValid: true,
      });
    }

    localStorage.setItem(localStorageKey, JSON.stringify(config));
  }, [config]);

  return [config, setConfig];
};

export default useConfig;
