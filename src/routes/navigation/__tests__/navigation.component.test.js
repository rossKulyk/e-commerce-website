import { screen } from "@testing-library/dom";
import { renderWithProviders } from "../../../utils/test/test.utils";
import NavigationBar from "../navigation.component";

describe("Cart Icon test", () => {
  test("Should render a Sign In link if there is no currentUser", () => {
    renderWithProviders(<NavigationBar />, {
      preloadedState: {
        user: { currentUser: null },
      },
    });

    // screen.debug(screen.getByText(/sign in/i));
    const signInLinkEl = screen.getByText(/sign in/i);
    expect(signInLinkEl).toBeInTheDocument();

    const signOutLinkEl = screen.queryByText(/sign out/i);
    expect(signOutLinkEl).toBeNull();
  });

  test("Should render a Sign Out link if there is a currentUser", () => {
    renderWithProviders(<NavigationBar />, {
      preloadedState: {
        user: { currentUser: {} },
      },
    });

    // screen.debug(screen.getByText(/sign out/i));
    const signOutLinkEl = screen.getByText(/sign out/i);
    expect(signOutLinkEl).toBeInTheDocument();

    const signInLinkEl = screen.queryByText(/sign in/i);
    expect(signInLinkEl).toBeNull();
  });

  test("Should not render a cart dropdown if isCartOpen is false ", () => {
    renderWithProviders(<NavigationBar />, {
      preloadedState: {
        cart: { isCartOpen: false, cartItems: [] },
      },
    });
    const dropdownTextEl = screen.queryByText(/your cart is empty/i);
    // screen.debug(screen.queryByText(/your cart is empty/i));
    expect(dropdownTextEl).toBeNull();
  });

  test("Should render a cart dropdown if isCartOpen is true ", () => {
    renderWithProviders(<NavigationBar />, {
      preloadedState: {
        cart: { isCartOpen: true, cartItems: [] },
      },
    });
    const dropdownTextEl = screen.getByText(/your cart is empty/i);
    // screen.debug(screen.getByText(/your cart is empty/i));
    expect(dropdownTextEl).toBeInTheDocument();
  });
});
