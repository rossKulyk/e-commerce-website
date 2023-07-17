// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; //initializeApp creates app instance based on config
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWe30rpcHDe77AmDwAk6g_9yr_tFB9EEg",
  authDomain: "e-commerce-db-238c4.firebaseapp.com",
  projectId: "e-commerce-db-238c4",
  storageBucket: "e-commerce-db-238c4.appspot.com",
  messagingSenderId: "388192317796",
  appId: "1:388192317796:web:33dabf63e210995a0e4a71",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// console.log("firebaseApp:", firebaseApp);
const googleProvider = new GoogleAuthProvider(); // could be different providers: Facebook, etc
// console.log("googleProvider by GoogleAuthProvider:", googleProvider);
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// authenticate client using a popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// authenticate client with google page using full-page redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// returns default firestore instance
export const db = getFirestore();
// console.log("DB:", db);
//
export const createUserDocFromAuth = async (userAuth, other = {}) => {
  // console.log("createUserDocFromAuth userAuth:", userAuth);
  if (!userAuth) return;
  // check if existing doc reference
  const userDocRef = doc(db, "users", userAuth.uid); //user.uid -> unique user identefier
  // console.log("createUserDocFromAuth() userDocRef:", userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  // console.log("createUserDocFromAuth() userSnapshot:", userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    // console.log("displayName, email, other :", displayName, email, other);
    const createdAt = new Date();
    //
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...other,
      });
    } catch (error) {
      console.log("ERROR CREATING THE USER:", error);
    }
  }
  return userDocRef;
};

// create a new user acc assosiated with the provided email & password
export const createAuthUserWithEmailPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

// signs in with provided user & password
export const userSignInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

// signs out curr user
export const signOutUser = async () => {
  return await signOut(auth);
};

//
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
