import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

// action creator func
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  // updateCartItemsReducer(newCartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
// action creator func
export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  // updateCartItemsReducer(newCartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
// action creator func
export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  // updateCartItemsReducer(newCartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
// action creator func
export const setIsCartOpen = (boolean) => {
  return createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, boolean);
};
