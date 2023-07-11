import { useState } from "react";
import {
  userSignInWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component";
import "../button/button.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await userSignInWithEmailAndPassword(email, password);
      console.log("SignInForm response:", response);
      setFormFields(defaultFormFields);
    } catch (err) {
      console.log("ERROR CATCH:", err);
    }
  };

  //
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  //
  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    console.log("signInWithGoogle_RESPONSE signInWithGooglePopup:", response);
    const userDocRef = await createUserDocFromAuth(response.user);
    console.log(
      "signInWithGoogle_RESPONSE.signInWithGooglePopup / userDocRef:",
      userDocRef
    );
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          required
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={email}
          required
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit" onClick={handleSubmit}>
            Sign In
          </Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sign-in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
