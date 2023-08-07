import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

//config obj to persist redux
const persistConfig = {
  key: "root",
  storage,
  balcjlist: ["user"],
};

// create persist reducer using persist config
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [logger];

// applyMiddleware intercepts actions before they reach the reducers, allows to perform tasks like
// logging, handling asynchronous actions, or modifying actions before they update the state
const composeEnhancer = compose(applyMiddleware(...middleware));
export const store = createStore(persistedReducer, undefined, composeEnhancer);
// 
export const persistor = persistStore(store);
