import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChampionMasteryDTO,
  ChampionMinimalDTO,
  ChampSelectSessionFunction,
  ChestEligibilityDTO,
  SummonerDTO,
} from "../APIs/lcu-types";
import { LcuCredentials } from "../APIs/lcu-connector";
import {
  GetChampionMastery,
  GetChampionsMinimal,
  GetChestEligibility,
  GetCurrentSummoner,
  OnChampSelect,
  SwapWithChampion,
} from "../APIs/lcu-client";

export interface LcuState {
  GetChestEligibility: () => Promise<ChestEligibilityDTO>;
  GetCurrentSummoner: () => Promise<SummonerDTO>;
  GetChampionsMinimal: () => Promise<ChampionMinimalDTO[]>;
  GetChampionMastery: (summonerId: number) => Promise<ChampionMasteryDTO[]>;
  SwapWithChampion: (championId: number) => Promise<void>;
  OnChampSelect: (callback: ChampSelectSessionFunction) => Promise<void>;
}

const initialState: LcuState = {
  GetChestEligibility: null,
  GetCurrentSummoner: null,
  GetChampionsMinimal: null,
  GetChampionMastery: null,
  SwapWithChampion: null,
  OnChampSelect: null,
};

const lcuSlice = createSlice({
  name: "lcu",
  initialState,
  reducers: {
    setupLcu(state, action: PayloadAction<LcuCredentials>) {
      state.GetChestEligibility = () => GetChestEligibility(action.payload);
      state.GetCurrentSummoner = () => GetCurrentSummoner(action.payload);
      state.GetChampionsMinimal = () => GetChampionsMinimal(action.payload);
      state.GetChampionMastery = (summonerId: number) =>
        GetChampionMastery(action.payload, summonerId);
      state.SwapWithChampion = (championId: number) =>
        SwapWithChampion(action.payload, championId);
      state.OnChampSelect = (callback: ChampSelectSessionFunction) =>
        OnChampSelect(action.payload, callback);
    },
  },
});

export const { setupLcu } = lcuSlice.actions;
export default lcuSlice.reducer;
