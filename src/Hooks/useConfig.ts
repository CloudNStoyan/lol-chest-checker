import React, { useEffect } from "react";
import fs from "fs";
import path from "path";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setConfig } from "../store/leagueSlice";

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
    return false;
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

const useConfig = (): UseConfigReturns => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.leagueReducer.config);
  const updateConfig = (newConfig: SetupConfig) =>
    dispatch(setConfig(newConfig));

  useEffect(() => {
    const retrievedData = localStorage.getItem(localStorageKey);

    let retrievedConfig: SetupConfig;

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

    dispatch(setConfig(retrievedConfig));
  }, []);

  useEffect(() => {
    const isConfigValid = configIsValid(config);
    if (!isConfigValid && config.pathToLeagueOfLegendsIsValid) {
      dispatch(
        setConfig({
          pathToLeagueOfLegends: config.pathToLeagueOfLegends,
          pathToLeagueOfLegendsIsValid: false,
        })
      );

      return;
    }

    if (isConfigValid && !config.pathToLeagueOfLegendsIsValid) {
      dispatch(
        setConfig({
          pathToLeagueOfLegends: config.pathToLeagueOfLegends,
          pathToLeagueOfLegendsIsValid: true,
        })
      );
    }

    localStorage.setItem(localStorageKey, JSON.stringify(config));
  }, [config]);

  return [config, updateConfig];
};

export default useConfig;
