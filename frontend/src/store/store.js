import { configureStore } from "@reduxjs/toolkit";
import trafficReducer, { fetchCountryTraffic } from "./trafficSlice";

export const store = configureStore({
  reducer: {
    traffic: trafficReducer,
  },
});

store.dispatch(fetchCountryTraffic());
