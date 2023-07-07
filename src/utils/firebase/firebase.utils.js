// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; //initializeApp creates app instance based on config
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
//
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
console.log("firebaseApp:", firebaseApp);
const provider = new GoogleAuthProvider(); //
console.log("provider by GoogleAuthProvider:", provider);
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); //
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//
export const db = getFirestore();
console.log("DB:", db);
export const createUserDocFromAuth = async (userAuth) => {
  console.log("createUserDocFromAuth userAuth:", userAuth);

  // check if existing doc reference
  const userDocRef = doc(db, "users", userAuth.uid); //user.uid -> unique user identefier
  console.log("createUserDocFromAuth() userDocRef:", userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log("createUserDocFromAuth() userSnapshot:", userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    console.log("displayName, email :", displayName, email);
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("ERROR CREATING THE USER:", error);
    }
  }
  return userDocRef;
};
