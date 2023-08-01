import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocFromAuth,
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

// default value to be accessed
export const UserContext = createContext({
  currUser: null,
  setCurrUser: () => null,
});

//
export const USER_ACTION_TYPES = {
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

//
export const UserProvider = ({ children }) => {
  const [{ currUser }, dispatch] = useReducer(userReducer, INITIAL_STATE); // destructure state {currUser}=state
  // console.log("UserProvider CURRENT_USER:", currUser);
  const setCurrUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };
  const value = { currUser, setCurrUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrUser(user);
    });
    return () => unsubscribe();
  }, []);

  // component that wrap around other components that need access to values
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
