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
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../../store/categories/category.types";

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
const googleProvider = new GoogleAuthProvider(); // could be different providers: Facebook, etc
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

//
export type ObjectToAdd = {
  title: string;
};
export const addCollectionAndDocs = async <T extends ObjectToAdd>(
  collectionKey: string,
  objToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  //
  objToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });
  await batch.commit();
};

// retrieve data
export const getCategoriesAndDocs = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const queryObj = query(collectionRef);
  const querySnapshot = await getDocs(queryObj);

  return querySnapshot.docs.map((docSnapshot) => {
    // console.log(">> querySnapshot.docs.map docSnapshot: ", docSnapshot);
    // console.log(" >>> docSnapshot.DATA()", docSnapshot.data());
    return docSnapshot.data() as Category;
  });
};

//
export type OtherInfo = {
  displayName?: string;
};
export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};
export const createUserDocFromAuth = async (
  userAuth: User,
  other = {} as OtherInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  // console.log("createUserDocFromAuth userAuth:", userAuth);
  if (!userAuth) return;
  // check if existing doc reference
  const userDocRef = doc(db, "users", userAuth.uid); //user.uid -> unique user identefier
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

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
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// create a new user acc assosiated with the provided email & password
export const createAuthUserWithEmailPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

// signs in with provided user & password
export const userSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
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
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
