import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

//
export type RootState = ReturnType<typeof rootReducer>;
//
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

//config obj to persist redux
const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // to be persisted in the localstorage
};

const sagaMiddleware = createSagaMiddleware();
// create persist reducer using persist config
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));
// should be run only in dev, not production code
// const middleWares = [
//   process.env.NODE_ENV !== "production" && logger,
//   thunk,
// ].filter(
//   Boolean // filters everything that's not true
// );

// if not in production env and window obj && dev tools exist, otherwise use compose of redux
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// applyMiddleware intercepts actions before they reach the reducers, allows to perform tasks like
// logging, handling asynchronous actions, or modifying actions before they update the state
const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);
//
sagaMiddleware.run(rootSaga);
//
export const persistor = persistStore(store);
