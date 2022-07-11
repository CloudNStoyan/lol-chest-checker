import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import leagueReducer from "./leagueSlice";
import lcuReducer from "./lcuSlice";

export const store = configureStore({
  reducer: {
    configReducer,
    leagueReducer,
    lcuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
