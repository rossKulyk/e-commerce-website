import {
  GoogleSignInButton,
  InvertedButton,
  BaseButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

// custom button for different class types
const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
  // return (
  //   <button
  //     className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
  //     {...otherProps}
  //   >
  //     {children}
  //   </button>
  // );
};
export default Button;
