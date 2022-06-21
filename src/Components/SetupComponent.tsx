import { ipcRenderer } from "electron";
import React, { FunctionComponent, useState } from "react";
import SetupComponentStyled from "./SetupComponent.styled";
import { SetupConfig } from "../ConfigCreator";
import type { SaveConfigFunc } from "../ConfigCreator";

export type SetupComponentProps = {
  config: SetupConfig;
  setConfig: React.Dispatch<React.SetStateAction<SetupConfig>>;
  saveConfig: SaveConfigFunc;
  checkIfPathIsValid: (path: string) => boolean;
};

const SetupComponent: FunctionComponent<SetupComponentProps> = ({
  config,
  saveConfig,
  setConfig,
  checkIfPathIsValid,
}) => {
  const openFileDialog = async () => {
    const path = await ipcRenderer.invoke("dialog:openFolder");
    setConfigPath(path);

    if (checkIfPathIsValid(path)) {
      const newConfig = {
        pathToLeagueOfLegends: path,
        pathToLeagueOfLegendsIsValid: true,
      };

      setConfig(newConfig);
      saveConfig(newConfig);
    }
  };

  const [configPath, setConfigPath] = useState(
    config?.pathToLeagueOfLegends || ""
  );

  return (
    <SetupComponentStyled>
      <h2>Couldn't locate League of Legends</h2>
      <h3>Current Path:</h3>
      <input value={configPath} readOnly={true} />
      <h3>Please select where the League of Legends folder is:</h3>
      <button onClick={openFileDialog}>Select Folder</button>
    </SetupComponentStyled>
  );
};

export default SetupComponent;
