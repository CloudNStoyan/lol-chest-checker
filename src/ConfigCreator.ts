import fs from "fs";
import path from "path";

const __CONFIG__KEY__ = "__CONFIG__DATA__";

const ConfigCreator = () => {
  const retrievedConfigJson = localStorage.getItem(__CONFIG__KEY__);

  let config: SetupConfig = {
    pathToLeagueOfLegends: null,
    pathToLeagueOfLegendsIsValid: false,
  };

  const SaveConfig: SaveConfigFunc = (config) => {
    localStorage.setItem(__CONFIG__KEY__, JSON.stringify(config));
  };

  const CheckIfPathIsValid = (dirPath: string) => {
    if (!dirPath) {
      return false;
    }

    return fs.existsSync(path.join(dirPath, "LeagueClientUx.exe"));
  };

  if (retrievedConfigJson) {
    try {
      config = JSON.parse(retrievedConfigJson);
    } finally {
      if (config) {
        config.pathToLeagueOfLegendsIsValid = CheckIfPathIsValid(
          config.pathToLeagueOfLegends
        );
      }
    }
  }

  return {
    SaveConfig,
    CheckIfPathIsValid,
    config,
  };
};

export type SetupConfig = {
  pathToLeagueOfLegends: string;
  pathToLeagueOfLegendsIsValid: boolean;
};

export type SaveConfigFunc = (config: SetupConfig) => void;

export default ConfigCreator;
