import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {
  onAuthStateChangedListener,
  createUserDocFromAuth,
  getCurrUser,
} from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigation/navigation.component";
import Authentication from "./routes/auth/authentication.component.jsx";
import Checkout from "./routes/checkout/checkout.component";
import Shop from "./routes/shop/shop.component";
import { setCurrUser, checkUserSession } from "./store/user/user.action";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    // getCurrUser().then((user) => console.log("> APP user:", user));
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocFromAuth(user);
    //   }
    //   dispatch(setCurrUser(user));
    // });
    // return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route path="/" element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
