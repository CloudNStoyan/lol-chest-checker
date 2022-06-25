import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SetupConfig = {
  pathToLeagueOfLegends: string;
  pathToLeagueOfLegendsIsValid: boolean;
};
export interface LeagueState {
  clientIsOpen: boolean;
  config: SetupConfig;
}

const initialState: LeagueState = {
  clientIsOpen: false,
  config: {
    pathToLeagueOfLegends: null,
    pathToLeagueOfLegendsIsValid: false,
  },
};

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<SetupConfig>) {
      state.config = action.payload;
    },
    setClientIsOpen(state, action: PayloadAction<boolean>) {
      state.clientIsOpen = action.payload;
    },
  },
});

export const { setConfig, setClientIsOpen } = leagueSlice.actions;
export default leagueSlice.reducer;
