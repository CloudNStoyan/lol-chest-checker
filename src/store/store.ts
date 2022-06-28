import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import leagueReducer from "./leagueSlice";

export const store = configureStore({
  reducer: {
    configReducer,
    leagueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
