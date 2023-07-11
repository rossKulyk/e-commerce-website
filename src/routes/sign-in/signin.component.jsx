import { useEffect, useState } from "react";
import { getRedirectResult } from "@firebase/auth";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  auth,
  userSignInWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up/sign-up.component";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("LOGIN email:", email, ", password:", password);
    // if (confirmPassword !== password) {
    //   alert("Password does not match");
    //   return;
    // }

    try {
      const response = await userSignInWithEmailAndPassword(email, password);
      console.log("LOGIN response.", response);
    } catch (err) {
      console.log("ERROR CATCH:", err);
    }
  };

  return (
    <div>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input
          value={email}
          type="email"
          required
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>password</label>
        <input
          value={password}
          type="text"
          required
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Sig In</button>
      </form>
      <button onClick={logGoogleUser}>Sign-in with Google</button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
