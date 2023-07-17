import { useContext } from "react";
import { CartContext } from "../../contexts/context.js";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => {
          console.log("ITEM:", item);
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      <Button>Go to checkout</Button>
    </div>
  );
};
export default CartDropdown;
