import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  userSignInWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";
import "../button/button.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      // await userSignInWithEmailAndPassword(email, password);
      // console.log("SignInForm user:", user);

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
    dispatch(googleSignInStart());
    // await signInWithGooglePopup();
    // createUserDocFromAuth(user);
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
          value={password}
          required
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit" onClick={handleSubmit}>
            Sign In
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Sign-in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
