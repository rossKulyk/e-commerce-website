import { AnyAction } from "redux";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { Category } from "../categories/category.types";
import { setIsCartOpen, setCartItems } from "./cart.action";

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
};
export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }
  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }
  return state;
  // const { type, payload } = action;
  // switch (type) {
  //   case CART_ACTION_TYPES.SET_CART_ITEMS:
  //     return { ...state, cartItems: payload };
  //   case CART_ACTION_TYPES.SET_CART_IS_OPEN:
  //     return { ...state, isCartOpen: payload };
  //   default:
  //     return state;
  // }
};
