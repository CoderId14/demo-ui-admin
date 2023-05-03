import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
  } from "@reduxjs/toolkit";
  
  import authReducer from "./authSlice";

  import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  
  import storage from "redux-persist/lib/storage";
  
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  const rootReducer = combineReducers({
    auth: authReducer
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    ],
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export const persistor = persistStore(store);
  export const selectAuth = (state: RootState) => state.auth;
  
  export type AppDispatch = typeof store.dispatch;
  