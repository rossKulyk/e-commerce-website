import { useContext } from "react";
import { CartContext } from "../../contexts/context";
import { ReactComponent as Icon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <Icon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};
export default CartIcon;
