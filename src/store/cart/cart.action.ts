import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

// --------------------------
// helper/utility func to add items to cart
const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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

// helper/utility func to remove items from cart
const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  const existingItem = cartItems.find((item) => {
    return item.id === productToRemove.id;
  });
  if (existingItem && existingItem.quantity === 1) {
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

// helper/utility func to clear items from cart
const clearCartItem = (
  cartItems: CartItem[],
  productToClear: CartItem
): CartItem[] => {
  return cartItems.filter((item) => {
    return item.id !== productToClear.id; // return only items that are not equal
  });
};

// define action as type
export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_IS_OPEN,
  boolean
>;
// define action as type
export type SetCartItem = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

// action creator func
export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, boolean);
});

//
export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItem => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
  }
);
// action creator func
export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  return setCartItems(newCartItems);
};
// action creator func
export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  return setCartItems(newCartItems);
};
// action creator func
export const clearItemFromCart = (
  cartItems: CartItem[],
  productToClear: CartItem
) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  return setCartItems(newCartItems);
};
