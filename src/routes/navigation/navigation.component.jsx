import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/context";
import { signOutUser } from "../../utils/firebase/firebase.utils.js";

const NavigationBar = () => {
  const { currUser } = useContext(UserContext);

  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrUser(null);
  // };

  console.log("NavigationBar_USER:", currUser);
  return (
    <Fragment>
      <div className="navigation-container">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
export default NavigationBar;
