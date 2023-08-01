import { createContext, useState, useReducer, useEffect } from "react";
import { getCategoriesAndDocs } from "../utils/firebase/firebase.utils";

// ---------------------------------------------------
export const CategoriesContext = createContext({
  // products: [],
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocs();
      // console.log("CONTEXT_CategoriesProvider categoryMap:", categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

// // --------------------------
// // helper func to add items to cart
// const addCartItem = (cartItems, productToAdd) => {
//   const existingItem = cartItems.find((cartItem) => {
//     return cartItem.id === productToAdd.id;
//   });
//   if (existingItem) {
//     return cartItems.map((cartItem) => {
//       return cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem;
//     });
//   }
//   //
//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// // helper func to remove items from cart
// const removeCartItem = (cartItems, productToRemove) => {
//   const existingItem = cartItems.find((item) => {
//     return item.id === productToRemove.id;
//   });
//   if (existingItem.quantity === 1) {
//     return cartItems.filter((item) => {
//       return item.id !== productToRemove.id; // return only items that are not equal
//     });
//   }
//   return cartItems.map((item) => {
//     return item.id === productToRemove.id
//       ? { ...item, quantity: item.quantity - 1 }
//       : item;
//   });
// };

// // helper func to clear items from cart
// const clearCartItem = (cartItems, productToClear) => {
//   return cartItems.filter((item) => {
//     return item.id !== productToClear.id; // return only items that are not equal
//   });
// };

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
//   cartCount: 0,
//   removeItemFromCart: () => {},
//   clearItemFromCart: () => {},
//   cartTotal: 0,
// });

// export const CartProvider = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);

//   useEffect(() => {
//     const newCartCount = cartItems.reduce((total, item) => {
//       return total + item.quantity;
//     }, 0);
//     setCartCount(newCartCount);
//   }, [cartItems]);

//   useEffect(() => {
//     const newCartTotal = cartItems.reduce((total, item) => {
//       return total + item.quantity * item.price;
//     }, 0);
//     setCartTotal(newCartTotal);
//   }, [cartItems]);

//   //
//   const addItemToCart = (productToAdd) => {
//     setCartItems(addCartItem(cartItems, productToAdd));
//     // console.log("CONTEXT >> addItemToCart > cartItems:", cartItems);
//   };

//   //
//   const removeItemFromCart = (productToRemove) => {
//     setCartItems(removeCartItem(cartItems, productToRemove));
//     // console.log("CONTEXT >> removeItemFromCart > cartItems:", cartItems);
//   };

//   //
//   const clearItemFromCart = (productToClear) => {
//     setCartItems(clearCartItem(cartItems, productToClear));
//     // console.log("CONTEXT >> clearItemFromCart > cartItems:", cartItems);
//   };
//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     cartItems,
//     addItemToCart,
//     cartCount,
//     removeItemFromCart,
//     clearItemFromCart,
//     cartTotal,
//   };
//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
