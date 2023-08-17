import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { UserData, OtherInfo } from "../../utils/firebase/firebase.utils";

// =>
// user action types
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export type SetCurrUser = ActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  UserData
>;
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;
export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  {
    email: string;
    password: string;
    displayName: string;
  }
>;
export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  {
    user: UserData;
    additionalDetails: OtherInfo;
  }
>;
export type SignUpFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILED,
  Error
>;
export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;
export type SignInFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  Error
>;
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type SignOutFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  Error
>;

// =>
// user action creator
export const checkUserSession = withMatcher((): CheckUserSession => {
  return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
});
//
export const setCurrUser = withMatcher((user: UserData): SetCurrUser => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
});
//
export const googleSignInStart = withMatcher((): GoogleSignInStart => {
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
});
//
export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart => {
    return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
      email,
      password,
    });
  }
);
//
export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName,
    });
  }
);
//
export const signUpSuccess = withMatcher(
  (user: UserData, additionalDetails: OtherInfo): SignUpSuccess => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
      user,
      additionalDetails,
    });
  }
);
//
export const signUpFailed = withMatcher((error: Error): SignUpFailed => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);
});
//
export const signInSuccess = withMatcher((user: UserData): SignInSuccess => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
});
//
export const signInFailed = withMatcher((error: Error): SignInFailed => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
});
//
export const signOutStart = withMatcher((): SignOutStart => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_START);
});
//
export const signOutSuccess = withMatcher((): SignOutSuccess => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
});
//
export const signOutFailed = withMatcher((error: Error): SignOutFailed => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
});
