import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";

// input selector
const selectCartReducer = (state):CartState => {
  return state.cart;
};

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartArr) => {
    return cartArr.cartItems;
  }
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartArr) => {
    return cartArr.isCartOpen;
  }
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
  }
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);
  }
);

// const newCartCount = cartItems.reduce((total, item) => {
//   return total + item.quantity;
// }, 0);
// //
// const newCartTotal = cartItems.reduce((total, item) => {
//   return total + item.quantity * item.price;
// }, 0);
