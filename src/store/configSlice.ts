import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localStorageKey, configIsValid } from "../Hooks/useConfig";

export type SetupConfig = {
  pathToLeagueOfLegends: string;
  pathToLeagueOfLegendsIsValid: boolean;
};
export interface ConfigState {
  clientIsOpen: boolean;
  config: SetupConfig;
}

const initialState: ConfigState = {
  clientIsOpen: false,
  config: {
    pathToLeagueOfLegends: null,
    pathToLeagueOfLegendsIsValid: false,
  },
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<SetupConfig>) {
      const config = action.payload;
      config.pathToLeagueOfLegendsIsValid = configIsValid(config);
      state.config = config;
      localStorage.setItem(localStorageKey, JSON.stringify(config));
    },
    setClientIsOpen(state, action: PayloadAction<boolean>) {
      state.clientIsOpen = action.payload;
    },
  },
});

export const { setConfig, setClientIsOpen } = configSlice.actions;
export default configSlice.reducer;
