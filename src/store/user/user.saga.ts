import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import { USER_ACTION_TYPES } from "./user.types";
import { User } from "firebase/auth";
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
} from "./user.action";
import {
  getCurrUser,
  createUserDocFromAuth,
  signInWithGooglePopup,
  userSignInWithEmailAndPassword,
  createAuthUserWithEmailPassword,
  signOutUser,
  OtherInfo,
} from "../../utils/firebase/firebase.utils";

//
export function* getSnapShotFromUserAuth(
  userAuth: User,
  additionalDetails?: OtherInfo
) {
  try {
    const userSnapshot = yield* call(
      createUserDocFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
//
export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrUser);
    if (!userAuth) {
      return;
    }
    yield* call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
//
export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
//
export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      userSignInWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
//
export function* signUpStart({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}
//
export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}
//
export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  yield* call(getSnapShotFromUserAuth, user, additionalDetails);
}

// => entry sagas:
export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpStart);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
