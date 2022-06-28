import { useEffect } from "react";
import fs from "fs";
import path from "path";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setConfig } from "../store/configSlice";

export type SetupConfig = {
  pathToLeagueOfLegends: string;
  pathToLeagueOfLegendsIsValid: boolean;
};

export type UseConfigReturns = [SetupConfig, boolean];

export const localStorageKey = "__LCC_CONFIG__";

export const configIsValid = (config: SetupConfig) => {
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
  const { config, clientIsOpen } = useAppSelector(
    (state) => state.configReducer
  );

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

  return [config, clientIsOpen];
};

export default useConfig;
