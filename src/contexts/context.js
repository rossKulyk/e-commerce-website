import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocFromAuth,
} from "../utils/firebase/firebase.utils";
import PRODUCTS from "../data.json";

// default value to be accessed
export const UserContext = createContext({
  currUser: null,
  setCurrUser: () => null,
});
//
export const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const value = { currUser, setCurrUser };
  // signOutUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      console.log(">>>>>>>> UserProvider USER:", user, ", value:", value);
      setCurrUser(user);
    });
    return () => unsubscribe();
    // return unsubscribe();
  }, []);

  // component that wrap around other components that need access to values
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// ---------------------------------------------------
export const ProductsContext = createContext({
  products: [],
  // setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
