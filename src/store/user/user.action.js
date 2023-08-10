import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

// user action creator
export const setCurrUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};

export const checkUserSession = () => {
  return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
};
//
export const googleSignInStart = () => {
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
};
//
export const emailSignInStart = (email, password) => {
  return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
    email,
    password,
  });
};
//
export const signInSuccess = (user) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
};
//
export const signInFailed = (error) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
};
