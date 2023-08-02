import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middleware = [logger];
// applyMiddleware intercepts actions before they reach the reducers, allows to perform tasks like
// logging, handling asynchronous actions, or modifying actions before they update the state
const composeEnhancer = compose(applyMiddleware(...middleware));
export const store = createStore(rootReducer, undefined, composeEnhancer);
