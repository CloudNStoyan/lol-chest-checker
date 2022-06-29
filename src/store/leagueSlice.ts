import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LcuCredentials } from "../APIs/lcu-connector";
import { ChampionMasteryDTOWithData } from "../APIs/ddragon-types";

export interface FilterBrowseData {
  filter: string;
  showEarned: boolean;
}

export interface LeagueState {
  browseChampData: ChampionMasteryDTOWithData[];
  browseChampDataFilter: FilterBrowseData;
  benchedChampions: ChampionMasteryDTOWithData[];
  selectedChampion: ChampionMasteryDTOWithData;
  lcuCredentials: LcuCredentials;
}

const initialState: LeagueState = {
  browseChampData: [],
  browseChampDataFilter: null,
  benchedChampions: [],
  selectedChampion: null,
  lcuCredentials: null,
};

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setBrowseChampData(
      state,
      action: PayloadAction<ChampionMasteryDTOWithData[]>
    ) {
      const data = [...action.payload];
      data.sort((firstChamp, secondChamp) => {
        if (
          firstChamp.championData.name.toLowerCase() <
          secondChamp.championData.name.toLowerCase()
        ) {
          return -1;
        }
        if (
          firstChamp.championData.name.toLowerCase() >
          secondChamp.championData.name.toLowerCase()
        ) {
          return 1;
        }
        return 0;
      });

      state.browseChampData = data;
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
    setBrowseChampDataFilter(state, action: PayloadAction<FilterBrowseData>) {
      state.browseChampDataFilter = action.payload;
    },
    setLcuCredentials(state, action: PayloadAction<LcuCredentials>) {
      state.lcuCredentials = action.payload;
    },
  },
});

export const {
  setBrowseChampData,
  setBrowseChampDataFilter,
  setBenchedChampsData,
  setSelectedChampion,
  setLcuCredentials,
} = leagueSlice.actions;
export default leagueSlice.reducer;
