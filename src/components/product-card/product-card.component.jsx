import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { name, price, imageUrl } = product;
  const cartItems = useSelector((state) => state.cart.cartItems);

  const addProductToCard = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        // onClick={() => addProductToCard}
        onClick={addProductToCard}
      >
        Add to card
      </Button>
    </div>
  );
};
export default ProductCard;
