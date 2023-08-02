import { createContext, useReducer } from "react";
// import {
//   onAuthStateChangedListener,
//   createUserDocFromAuth,
// } from "../utils/firebase/firebase.utils";
// import { createAction } from "../utils/reducer/reducer.utils";

// default value to be accessed
export const UserContext = createContext({
  currUser: null,
});
const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};
//
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currUser: payload,
      };
    default:
      throw new Error(`Unhandeled type ${type} in userReducer !!!`);
  }
};

//
const INITIAL_STATE = {
  currUser: null,
};
