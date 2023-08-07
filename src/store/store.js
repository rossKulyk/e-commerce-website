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
// should be run only in dev, not production code
const middleware = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean // filters everything that's not true
);

// if not in production env and window obj && dev tools exist, otherwise use compose of redux
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// applyMiddleware intercepts actions before they reach the reducers, allows to perform tasks like
// logging, handling asynchronous actions, or modifying actions before they update the state
const composeEnhancers = composeEnhancer(applyMiddleware(...middleware));
// const composeEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(persistedReducer, undefined, composeEnhancers);
//
export const persistor = persistStore(store);
