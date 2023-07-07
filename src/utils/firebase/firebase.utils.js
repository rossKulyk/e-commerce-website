// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; //initializeApp creates app instance based on config
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

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
