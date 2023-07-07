import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log("RESPONSE:", response);
    const userDocRef = await createUserDocFromAuth(response.user);
    console.log("RESPONSE / userDocRef:", userDocRef);
  };
  return (
    <div>
      <h1>Sign-in page</h1>
      <button onClick={logGoogleUser}>Sign-in with Google Popup</button>
    </div>
  );
};
export default SignIn;
