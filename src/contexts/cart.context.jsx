import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

// --------------------------
// helper func to add items to cart
const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });
  if (existingItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }
  //
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// helper func to remove items from cart
const removeCartItem = (cartItems, productToRemove) => {
  const existingItem = cartItems.find((item) => {
    return item.id === productToRemove.id;
  });
  if (existingItem.quantity === 1) {
    return cartItems.filter((item) => {
      return item.id !== productToRemove.id; // return only items that are not equal
    });
  }
  return cartItems.map((item) => {
    return item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item;
  });
};

// helper func to clear items from cart
const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((item) => {
    return item.id !== productToClear.id; // return only items that are not equal
  });
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_IS_OPEN: "SET_CART_IS_OPEN",
};
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  // console.log("REDUCER STATE:", state);
  // console.log("REDUCER PAYLOAD:", payload);

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandeled type ${type} in cartReducer !!!`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  // action creator func
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  // action creator func
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };
  // action creator func
  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };
  // action creator func
  const setIsCartOpen = (bool) => {
    // dispatch({ type: CART_ACTION_TYPES.SET_CART_IS_OPEN, payload: bool });
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, bool));
  };

  //
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    //
    const newCartTotal = cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
    //
    // dispatch({
    //   type: CART_ACTION_TYPES.SET_CART_ITEMS,
    //   payload: {
    //     cartItems: newCartItems,
    //     cartTotal: newCartTotal,
    //     cartCount: newCartCount,
    //   },
    // });
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
