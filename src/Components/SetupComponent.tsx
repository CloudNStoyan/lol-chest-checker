import { ipcRenderer } from "electron";
import React, { FunctionComponent } from "react";
import SetupComponentStyled from "./styles/SetupComponent.styled";
import type { SetupConfig } from "../Hooks/useConfig";

export type SetupComponentProps = {
  config: SetupConfig;
  setConfig: React.Dispatch<React.SetStateAction<SetupConfig>>;
};

const SetupComponent: FunctionComponent<SetupComponentProps> = ({
  config,
  setConfig,
}) => {
  const openFileDialog = async () => {
    const path = await ipcRenderer.invoke("dialog:openFolder");
    if (!path) {
      return;
    }

    const newConfig = {
      pathToLeagueOfLegends: path,
      pathToLeagueOfLegendsIsValid: false,
    };

    setConfig(newConfig);
  };

  return (
    <SetupComponentStyled>
      <h2>Couldn't locate League of Legends</h2>
      <h3>Current Path:</h3>
      <input value={config.pathToLeagueOfLegends || ""} readOnly={true} />
      <h3>Please select where the League of Legends folder is:</h3>
      <button onClick={openFileDialog}>Select Folder</button>
    </SetupComponentStyled>
  );
};

export default SetupComponent;
