import { ipcRenderer } from "electron";
import React, { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setConfig } from "../store/configSlice";
import SetupComponentStyled from "./styles/SetupComponent.styled";

const SetupComponent: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { config } = useAppSelector((state) => state.configReducer);

  const openFileDialog = async () => {
    const path = await ipcRenderer.invoke("dialog:openFolder");
    if (!path) {
      return;
    }

    const newConfig = {
      pathToLeagueOfLegends: path,
      pathToLeagueOfLegendsIsValid: false,
    };

    dispatch(setConfig(newConfig));
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
