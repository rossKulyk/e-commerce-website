import { useContext } from "react";
import { CartContext } from "../../contexts/context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.style.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  // console.log("Checkout_cartItems >>>> ", cartItems);

  return (
    <div className="checkout-container ">
      Checkout page
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {/* <div> */}
      {cartItems.map((item) => {
        {
          /* console.log("Checkout_ITEM >>>> ", item); */
        }
        return <CheckoutItem key={item.id} item={item} />;
      })}
      <span className="total">Total: ${cartTotal}</span>
      {/* </div> */}
    </div>
  );
};
export default Checkout;
