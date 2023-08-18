import { USER_ACTION_TYPES } from "./user.types";

//
const USER_INITIAL_STATE = {
  currUser: null,
  isLoading: false,
  error: null,
};

//
export const userReducer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;
  // console.log(" USER__REDUCER action:", action);

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {
        ...state,
        error: payload,
      };
    // case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
    //   return {
    //     ...state,
    //     error: payload,
    //   };
    default:
      return state;
  }
};
