import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

// Reducer
import themeReducer from "./slice/themeSlice.js";

const rootReducer = combineReducers({
  theme: themeReducer,
});

let persistedReducer = rootReducer;

// just active when client-side
if (typeof window !== "undefined") {
  const { persistReducer } = require("redux-persist");
  const { persistConfig } = require("./persistConfig");
  persistedReducer = persistReducer(persistConfig, rootReducer);
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
