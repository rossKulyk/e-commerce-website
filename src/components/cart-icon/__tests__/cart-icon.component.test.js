import { screen } from "@testing-library/dom";

import { renderWithProviders } from "../../../utils/test/test.utils";
import CartIcon from "../cart-icon.component";

describe("Cart Icon test", () => {
  test("Uses preloaded state to render", () => {
    const initialCartItems = [
      { id: 1, name: "Item 1", imageUrl: "test", price: 10, quantity: 1 },
      { id: 2, name: "Item 2", imageUrl: "test", price: 11, quantity: 2 },
    ];

    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: { cartItems: initialCartItems },
      },
    });

    const cartIconEl = screen.getByText("3");
    // console.log("CART_EL:", cartIconEl);
    // screen.debug(screen.getByText("1"));
    expect(cartIconEl).toBeInTheDocument();
  });
});
