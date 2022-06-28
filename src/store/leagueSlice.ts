import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";

export interface LeagueState {
  rawChampData: ChampionMasteryDTOWithData[];
  browseChampData: ChampionMasteryDTOWithData[];
  benchedChampions: ChampionMasteryDTOWithData[];
  selectedChampion: ChampionMasteryDTOWithData;
  filterInput: string;
  showEarned: boolean;
}

const initialState: LeagueState = {
  rawChampData: [],
  browseChampData: [],
  benchedChampions: [],
  selectedChampion: null,
  filterInput: null,
  showEarned: true,
};

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setBrowseChampData(
      state,
      action: PayloadAction<ChampionMasteryDTOWithData[]>
    ) {
      state.browseChampData = action.payload;
    },
    setRawChampData(
      state,
      action: PayloadAction<ChampionMasteryDTOWithData[]>
    ) {
      state.rawChampData = action.payload;
    },
    setBenchedChampsData(
      state,
      action: PayloadAction<ChampionMasteryDTOWithData[]>
    ) {
      state.benchedChampions = action.payload;
    },
    setSelectedChampion(
      state,
      action: PayloadAction<ChampionMasteryDTOWithData>
    ) {
      state.selectedChampion = action.payload;
    },
    setFilterInput(state, action: PayloadAction<string>) {
      state.filterInput = action.payload;
    },
    setShowEarned(state, action: PayloadAction<boolean>) {
      state.showEarned = action.payload;
    },
  },
});

export const {
  setBrowseChampData,
  setRawChampData,
  setBenchedChampsData,
  setSelectedChampion,
  setFilterInput,
  setShowEarned,
} = leagueSlice.actions;
export default leagueSlice.reducer;
