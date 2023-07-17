import { useState, useContext } from "react";
import {
  createAuthUserWithEmailPassword,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component";
// import { UserContext } from "../../contexts/contex";
import "../button/button.styles.scss";
import "./sign-up.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  // const { setCurrUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (confirmPassword !== password) {
      alert("Password does not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailPassword(email, password);
      // console.log("response.user", user);
      // setCurrUser(user);
      await createUserDocFromAuth(user, { displayName });
      setFormFields(defaultFormFields);
    } catch (err) {
      console.log("ERROR CATCH:", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          name="displayName"
          value={displayName}
          required
          onChange={handleChange}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          required
          onChange={handleChange}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
export default SignInForm;
