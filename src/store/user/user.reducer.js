import { USER_ACTION_TYPES } from "./user.types";

//
const INITIAL_STATE = {
  currUser: null,
};

//
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currUser: payload,
      };
    default:
      return state;
  }
};
