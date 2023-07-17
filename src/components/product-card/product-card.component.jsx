import { useContext } from "react";
import Button from "../button/button.component";
import { CartContext } from "../../contexts/context";
import "./product-card.styles.scss";

const ProductCard = ({ item }) => {
  const { name, price, imageUrl } = item;
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={() => addItemToCart(item)}>
        Add to card
      </Button>
    </div>
  );
};
export default ProductCard;
