import { useEffect } from "react";
import { getRedirectResult } from "@firebase/auth";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  auth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up/sign-up.component";

const SignIn = () => {
  useEffect(() => {
    const unsubscribe = async () => {
      const response = await getRedirectResult(auth);
      console.log("unsubscribe_RESPONSE:", response);
      if (response) {
        const userDocRef = await createUserDocFromAuth(response.user);
      }
    };
    unsubscribe();
  }, []);
  //
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log("logGoogleUser_RESPONSE signInWithGooglePopup:", response);
    const userDocRef = await createUserDocFromAuth(response.user);
    console.log(
      "logGoogleUser_RESPONSE.signInWithGooglePopup / userDocRef:",
      userDocRef
    );
  };
  return (
    <div>
      <h1>Sign-in page</h1>
      <button onClick={logGoogleUser}>Sign-in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
